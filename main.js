"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const obsidian_1 = require("obsidian");
// 默认设置
const DEFAULT_SETTINGS = {
    defaultFolder: './imports',
    fileCategories: [
        {
            id: 'images',
            name: '图片文件',
            extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
            folderPath: './images'
        },
        {
            id: 'audio',
            name: '音频文件',
            extensions: ['.mp3', '.wav'],
            folderPath: './audio'
        },
        {
            id: 'video',
            name: '视频文件',
            extensions: ['.mp4', '.mov'],
            folderPath: './video'
        },
        {
            id: 'pdf',
            name: 'PDF文档',
            extensions: ['.pdf'],
            folderPath: './documents'
        }
    ],
    enabled: true,
    // 重命名功能默认设置
    renameEnabled: true,
    namePattern: '附件-${DATE}',
    duplicateNumberPosition: 'suffix',
    duplicateNumberSeparator: ' ',
    // 调试模式默认关闭
    debugMode: false
};
class FileImportManager extends obsidian_1.Plugin {
    constructor() {
        super(...arguments);
        // 用于节流的计时器ID
        this.dragOverThrottleTimeout = null;
    }
    onload() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            // 注册设置标签页
            this.addSettingTab(new FileImportManagerSettingTab(this.app, this));
            // 注册命令来切换插件状态
            this.addCommand({
                id: 'toggle-file-import-manager',
                name: '切换文件导入管理器',
                callback: () => {
                    this.settings.enabled = !this.settings.enabled;
                    this.saveSettings();
                    this.updateDragDropHandler();
                }
            });
            // 初始化拖放处理
            this.updateDragDropHandler();
            console.log('文件导入管理器已加载');
        });
    }
    onunload() {
        // 当插件卸载时，Obsidian 会自动清理通过 registerDomEvent 注册的事件
        console.log('文件导入管理器已卸载');
    }
    loadSettings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    // 检查元素是否在Obsidian窗口内
    isElementInObsidianWindow(element) {
        // 优化的实现方式：精确识别Obsidian的有效拖放区域
        if (!element || !document.body.contains(element)) {
            return false;
        }
        // 检查元素或其祖先是否包含Obsidian特定的类名或ID
        const validDropRegions = [
            '.workspace',
            '.editor-container',
            '.file-explorer',
            '.sidebar',
            '.markdown-preview-view',
            '.canvas-container' // Canvas视图
        ];
        // 检查元素是否在有效拖放区域内
        let currentElement = element;
        while (currentElement && currentElement !== document.body) {
            // 检查当前元素是否匹配任何有效区域选择器
            for (const selector of validDropRegions) {
                if (currentElement.matches(selector)) {
                    return true;
                }
            }
            currentElement = currentElement.parentElement;
        }
        // 检查元素是否在文档主体内但不在排除区域内
        const excludedRegions = [
            '.modal-container',
            '.dropdown',
            '.context-menu',
            '.toast-notification',
            '.search-result-container' // 搜索结果
        ];
        // 检查元素是否在排除区域内
        for (const selector of excludedRegions) {
            const excludedElement = element.closest(selector);
            if (excludedElement) {
                return false;
            }
        }
        // 默认情况下，如果元素在body内且不在排除区域内，返回true
        return true;
    }
    saveSettings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    // 更新拖放处理函数
    updateDragDropHandler() {
        // 注意：我们不需要手动清理事件监听器，因为 Obsidian 会在插件卸载或重新注册时自动处理
        if (this.settings.enabled) {
            // 检查Obsidian版本兼容性
            this.checkVersionCompatibility();
            // 检查插件冲突
            this.checkPluginConflicts();
            // 使用捕获阶段的事件监听器，确保在Obsidian的原生处理程序之前捕获事件
            // 使用箭头函数来避免bind，提高性能和可读性
            // 应用节流函数，将handleDragOver的调用频率限制在每100ms一次
            const throttledDragOver = this.throttle((evt) => this.handleDragOver(evt), 100);
            const handleDrop = (evt) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.handleDrop(evt);
                }
                catch (error) {
                    console.error('拖放处理失败:', error);
                    new obsidian_1.Notice('文件导入失败，请重试');
                }
            });
            // 为document添加捕获阶段的事件监听器
            this.registerDomEvent(document, 'dragover', throttledDragOver, true);
            this.registerDomEvent(document, 'drop', handleDrop, true);
            // 为编辑器区域添加专门的事件监听器
            this.registerDomEvent(document, 'dragenter', throttledDragOver, true);
            this.registerDomEvent(document, 'dragleave', throttledDragOver, true);
            // 移除了vault.create事件监听器，避免在Obsidian启动时触发所有文件的创建通知
        }
    }
    // 检查Obsidian版本兼容性
    checkVersionCompatibility() {
        try {
            // 使用类型断言获取appVersion属性
            const appVersion = this.app.appVersion;
            // 检查appVersion是否存在
            if (!appVersion) {
                console.warn('文件导入管理器: 无法获取Obsidian版本信息，跳过版本检查');
                return;
            }
            // 解析版本号以便比较
            const [major, minor] = appVersion.split('.').map(Number);
            // 检查是否是支持的最低版本
            const minMajor = 1;
            const minMinor = 0;
            if (major < minMajor || (major === minMajor && minor < minMinor)) {
                console.warn(`文件导入管理器: 当前Obsidian版本(${appVersion})低于推荐版本(${minMajor}.${minMinor}+)`);
                // 在调试模式下显示通知
                if (this.settings.debugMode) {
                    new obsidian_1.Notice(`文件导入管理器: 您的Obsidian版本(${appVersion})可能不完全兼容，建议更新到${minMajor}.${minMinor}或更高版本。`);
                }
            }
        }
        catch (error) {
            console.error('无法检查Obsidian版本:', error);
        }
    }
    // 检查插件冲突
    checkPluginConflicts() {
        try {
            // 已知可能与拖放功能冲突的插件ID列表
            const conflictingPlugins = [
                'obsidian-image-toolkit',
                'obsidian-enhanced-attachments',
                'obsidian-file-explorer-extended'
            ];
            // 获取已启用的插件
            const enabledPlugins = this.app.plugins.enabledPlugins;
            if (enabledPlugins && typeof enabledPlugins.has === 'function') {
                const activeConflicts = [];
                // 检查是否有冲突的插件已启用
                for (const pluginId of conflictingPlugins) {
                    if (enabledPlugins.has(pluginId)) {
                        activeConflicts.push(pluginId);
                    }
                }
                // 如果有冲突，记录警告
                if (activeConflicts.length > 0) {
                    console.warn(`文件导入管理器: 检测到可能的插件冲突: ${activeConflicts.join(', ')}`);
                    // 在调试模式下显示通知
                    if (this.settings.debugMode) {
                        new obsidian_1.Notice(`文件导入管理器: 检测到可能与以下插件冲突: ${activeConflicts.join(', ')}. 可能会影响拖放功能。`);
                    }
                }
            }
        }
        catch (error) {
            console.error('无法检查插件冲突:', error);
        }
    }
    // 节流函数 - 限制函数的执行频率
    throttle(func, limit) {
        let inThrottle = false;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    // 处理拖动经过事件
    handleDragOver(evt) {
        // 确保evt不为null
        if (!evt)
            return;
        try {
            // 为了更好的用户体验，只在特定区域显示拖放指示器
            const target = evt.target;
            if (target && this.isElementInObsidianWindow(target)) {
                // 不阻止默认行为，让浏览器能够显示正常的拖入指示器
                // 但可以添加视觉反馈
                if (evt.dataTransfer) {
                    evt.dataTransfer.dropEffect = 'copy';
                }
            }
        }
        catch (error) {
            console.error('拖动处理错误:', error);
        }
    }
    // 处理放置事件
    handleDrop(evt) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 确保evt不为null
            if (!evt)
                return;
            try {
                // 检查是否包含外部文件
                // 如果没有外部文件，说明是内部文件/文件夹移动，不阻止默认行为
                if (!evt.dataTransfer || !evt.dataTransfer.files || evt.dataTransfer.files.length === 0) {
                    return;
                }
                // 检查目标元素是否在Obsidian窗口内
                const target = evt.target;
                if (!target || !this.isElementInObsidianWindow(target)) {
                    return;
                }
                // 只对外部文件阻止默认行为
                // 立即阻止默认行为和事件冒泡，防止Obsidian原生导入系统处理
                evt.preventDefault();
                evt.stopPropagation();
                // 添加额外的防护措施，确保事件不会被Obsidian的其他处理器捕获
                try {
                    Object.defineProperty(evt, 'defaultPrevented', {
                        get: () => true
                    });
                }
                catch (definePropertyError) {
                    // 某些浏览器可能不允许重新定义defaultPrevented属性
                    console.warn('无法定义defaultPrevented属性:', definePropertyError);
                }
                // 强制设置dragDataStore的dropEffect为'none'，进一步阻止默认行为
                if (evt.dataTransfer) {
                    evt.dataTransfer.dropEffect = 'none';
                }
                // 处理拖入的文件
                const importedFiles = [];
                const failedFiles = [];
                // 使用Promise.all并行处理文件，但限制并发数
                const concurrencyLimit = 5;
                const filePromises = [];
                const fileQueue = Array.from(evt.dataTransfer.files);
                while (fileQueue.length > 0) {
                    const batch = fileQueue.splice(0, concurrencyLimit);
                    const batchPromises = batch.map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        try {
                            // 处理外部文件
                            const importedFilePath = yield this.handleExternalFile(file);
                            importedFiles.push(importedFilePath);
                        }
                        catch (error) {
                            console.error('导入文件错误:', error);
                            failedFiles.push(file.name);
                        }
                    }));
                    yield Promise.all(batchPromises);
                }
                // 检查是否有活动编辑器，如果有，插入链接
                const activeLeaf = this.app.workspace.activeLeaf;
                if (activeLeaf) {
                    const activeView = activeLeaf.view;
                    if ('editor' in activeView) {
                        const editor = activeView.editor;
                        if (editor) {
                            // 创建链接文本
                            const linksText = importedFiles.map(filePath => {
                                // 获取文件名作为链接文本
                                const fileName = path.basename(filePath);
                                // 创建Obsidian内部链接格式 [[路径/文件名|显示文本]]
                                return `[[${filePath}|${fileName}]]`;
                            }).join(' ');
                            // 在编辑器光标位置插入链接
                            editor.replaceSelection(linksText);
                            // 给用户提示已插入链接
                            new obsidian_1.Notice(`已在编辑器中插入 ${importedFiles.length} 个链接`);
                        }
                    }
                }
                // 显示导入结果通知
                if (importedFiles.length > 0) {
                    new obsidian_1.Notice(`成功导入 ${importedFiles.length} 个文件`);
                }
                if (failedFiles.length > 0) {
                    new obsidian_1.Notice(`导入失败 ${failedFiles.length} 个文件: ${failedFiles.join(', ')}`);
                }
                // 手动清除所有文件夹的高亮状态
                // 通过触发document的dragleave事件来让Obsidian清除文件夹的高亮
                setTimeout(() => {
                    const dragLeaveEvent = new DragEvent('dragleave', {
                        bubbles: true,
                        cancelable: true,
                        dataTransfer: evt.dataTransfer
                    });
                    document.dispatchEvent(dragLeaveEvent);
                }, 0);
            }
            catch (error) {
                console.error('拖放处理出错:', error);
                new obsidian_1.Notice('处理拖放文件时发生错误');
            }
        });
    }
    // 检查元素是否属于 Obsidian 窗口
    isObsidianWindow(element) {
        // 简单检查元素是否在 Obsidian 的工作区内
        return element.closest('.workspace') !== null;
    }
    // 根据文件扩展名获取目标文件夹
    getTargetFolder(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        // 检查是否匹配已知类别
        for (const category of this.settings.fileCategories) {
            if (category.extensions.includes(ext)) {
                return category.folderPath;
            }
        }
        return this.settings.defaultFolder;
    }
    // 处理外部文件
    handleExternalFile(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // 获取文件扩展名
                const extension = path.extname(file.name).toLowerCase();
                const baseName = path.basename(file.name, extension);
                // 确定目标文件夹
                let targetFolderPath = this.getTargetFolder(file.name);
                // 规范化目标文件夹路径
                targetFolderPath = (0, obsidian_1.normalizePath)(targetFolderPath);
                // 确保目标文件夹存在
                yield this.ensureFolderExists(targetFolderPath);
                // 读取文件内容
                const arrayBuffer = yield this.readFileAsArrayBuffer(file);
                const buffer = Buffer.from(arrayBuffer);
                // 获取当前活动文件
                const activeFile = this.app.workspace.getActiveFile();
                // 生成新文件名（传递当前活动文件信息）
                let newFileName = file.name;
                if (this.settings.renameEnabled) {
                    newFileName = this.generateNewName(baseName, extension, activeFile);
                }
                // 构建目标文件路径
                const targetFilePath = (0, obsidian_1.normalizePath)(path.join(targetFolderPath, newFileName));
                // 处理重复文件名
                let finalFilePath = this.deduplicateNewName(targetFilePath, targetFolderPath);
                // 检查文件是否已存在，如果存在则添加数字
                let counter = 1;
                while (yield this.app.vault.adapter.exists(finalFilePath)) {
                    finalFilePath = this.deduplicateNewName(targetFilePath, targetFolderPath, counter);
                    counter++;
                    // 添加安全检查，防止无限循环
                    if (counter > 1000) {
                        throw new Error('检测到可能的无限循环，已达到最大重试次数');
                    }
                }
                // 写入文件 - 使用更安全的方式
                try {
                    // 确保使用FileSystemAdapter类型
                    const adapter = this.app.vault.adapter;
                    yield adapter.writeBinary(finalFilePath, buffer);
                }
                catch (adapterError) {
                    console.error('文件系统适配器错误:', adapterError);
                    // 降级到原始API
                    yield this.app.vault.adapter.writeBinary(finalFilePath, buffer);
                }
                console.log(`文件导入成功: ${file.name} -> ${finalFilePath}`);
                // 返回最终的文件路径
                return finalFilePath;
            }
            catch (error) {
                console.error('处理外部文件错误:', error);
                throw error;
            }
        });
    }
    // 替换日期变量，支持Moment.js格式
    replaceDateVar(template) {
        // 处理自定义格式的日期变量 ${DATE:format}
        let processedTemplate = template;
        const dateFormatRegex = /\$\{DATE:([^}]*)\}/g;
        let match;
        while ((match = dateFormatRegex.exec(template)) !== null) {
            const format = match[1] || 'YYYY-MM-DD';
            const formattedDate = (0, obsidian_1.moment)().format(format);
            processedTemplate = processedTemplate.replace(match[0], formattedDate);
        }
        const now = (0, obsidian_1.moment)();
        // 完整日期时间: YYYY-MM-DD_HH-mm-ss
        const fullDateTime = now.format('YYYY-MM-DD_HH-mm-ss');
        // 日期: YYYY-MM-DD
        const date = now.format('YYYY-MM-DD');
        // 年: YYYY
        const year = now.format('YYYY');
        // 月: MM
        const month = now.format('MM');
        // 日: DD
        const day = now.format('DD');
        // 时间: HH-mm-ss
        const time = now.format('HH-mm-ss');
        // 替换模板中的变量
        return processedTemplate
            .replace(/\$\{FULL_DATE_TIME\}/g, fullDateTime)
            .replace(/\$\{DATE\}/g, date)
            .replace(/\$\{YEAR\}/g, year)
            .replace(/\$\{MONTH\}/g, month)
            .replace(/\$\{DAY\}/g, day)
            .replace(/\$\{TIME\}/g, time);
    }
    // 获取当前活动文件的一级标题（使用metadataCache）
    getFirstHeading(activeFile) {
        try {
            // 确保文件存在
            if (!this.app.vault.getAbstractFileByPath(activeFile.path)) {
                return '';
            }
            // 使用metadataCache获取文件缓存信息
            const cache = this.app.metadataCache.getFileCache(activeFile);
            // 如果有headings缓存，查找级别为1的标题
            if ((cache === null || cache === void 0 ? void 0 : cache.headings) && cache.headings.length > 0) {
                const level1Heading = cache.headings.find(heading => heading.level === 1);
                if (level1Heading && level1Heading.heading) {
                    return level1Heading.heading.trim();
                }
            }
        }
        catch (error) {
            console.error('获取一级标题时出错:', error);
        }
        return '';
    }
    // 从frontmatter中获取imageNameKey
    getImageNameKeyFromFrontmatter(activeFile) {
        var _a;
        try {
            // 确保文件存在
            if (!this.app.vault.getAbstractFileByPath(activeFile.path)) {
                return '';
            }
            const frontmatter = (_a = this.app.metadataCache.getFileCache(activeFile)) === null || _a === void 0 ? void 0 : _a.frontmatter;
            if (frontmatter && frontmatter.imageNameKey) {
                return String(frontmatter.imageNameKey);
            }
        }
        catch (error) {
            console.error('从frontmatter获取imageNameKey时出错:', error);
        }
        return '';
    }
    // 生成新文件名（添加当前活动文件上下文参数）
    generateNewName(originalName, extension, activeFile) {
        if (!this.settings.renameEnabled) {
            return originalName + extension;
        }
        let newName = this.replaceDateVar(this.settings.namePattern);
        // 替换原始文件名变量
        newName = newName.replace(/\$\{ORIGINAL_NAME\}/g, originalName);
        // 如果有活动文件，替换其他变量
        if (activeFile) {
            // 获取当前活动文件名（不含.md扩展名）
            const fileNameWithoutExt = path.basename(activeFile.name, path.extname(activeFile.name));
            newName = newName.replace(/\$\{fileName\}/g, fileNameWithoutExt);
            // 获取当前活动文件所在目录名
            const dirName = activeFile.parent.path;
            newName = newName.replace(/\$\{dirName\}/g, dirName);
            // 获取当前活动文件的一级标题
            const firstHeading = this.getFirstHeading(activeFile);
            if (firstHeading) {
                newName = newName.replace(/\$\{firstHeading\}/g, firstHeading);
            }
            // 从frontmatter中获取imageNameKey
            const imageNameKey = this.getImageNameKeyFromFrontmatter(activeFile);
            if (imageNameKey) {
                newName = newName.replace(/\$\{imageNameKey\}/g, imageNameKey);
            }
        }
        // 确保文件名不包含无效字符
        newName = this.sanitizeFileName(newName);
        return newName + extension;
    }
    // 处理重复文件名
    deduplicateNewName(filePath, folderPath, counter = 0) {
        if (counter === 0) {
            return filePath;
        }
        const baseName = path.basename(filePath, path.extname(filePath));
        const extension = path.extname(filePath);
        let newName;
        if (this.settings.duplicateNumberPosition === 'prefix') {
            newName = `${counter}${this.settings.duplicateNumberSeparator}${baseName}`;
        }
        else {
            newName = `${baseName}${this.settings.duplicateNumberSeparator}(${counter})`;
        }
        return (0, obsidian_1.normalizePath)(path.join(folderPath, newName + extension));
    }
    // 清理文件名中的无效字符
    sanitizeFileName(name) {
        // 移除Windows系统不允许的字符
        const invalidChars = /[\\/:*?"<>|]/g;
        return name.replace(invalidChars, '_');
    }
    // 确保文件夹存在
    ensureFolderExists(folderPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // 规范化路径
                const normalizedPath = (0, obsidian_1.normalizePath)(folderPath);
                // 检查文件夹是否已存在
                const exists = yield this.app.vault.adapter.exists(normalizedPath);
                if (!exists) {
                    // 尝试使用vault.createFolder创建文件夹
                    yield this.app.vault.createFolder(normalizedPath);
                    console.log(`已创建文件夹: ${normalizedPath}`);
                }
                // 再次验证文件夹是否存在
                const finalExists = yield this.app.vault.adapter.exists(normalizedPath);
                if (!finalExists) {
                    throw new Error(`文件夹创建失败: ${normalizedPath}`);
                }
            }
            catch (error) {
                console.error('确保文件夹存在时出错:', error);
                throw error;
            }
        });
    }
    // 搜索匹配的文件夹
    searchFolders(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!query || typeof query !== 'string')
                return [];
            try {
                // 使用更现代的方法获取所有文件夹
                const allItems = this.app.vault.getAllLoadedFiles();
                const folders = allItems
                    .filter(item => item instanceof obsidian_1.TFolder)
                    .map(folder => folder.path)
                    .filter(folder => folder.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 10); // 限制最多返回10个结果
                return folders;
            }
            catch (error) {
                console.error('搜索文件夹时出错:', error);
                // 降级到原始方法
                try {
                    const allFiles = yield this.app.vault.adapter.list('');
                    const folders = allFiles.folders.filter(folder => folder.toLowerCase().includes(query.toLowerCase()));
                    return folders.slice(0, 10);
                }
                catch (fallbackError) {
                    console.error('搜索文件夹（降级方法）时出错:', fallbackError);
                    return [];
                }
            }
        });
    }
    // 读取文件为 ArrayBuffer
    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
}
exports.default = FileImportManager;
// 自定义文件夹选择模态框
class FolderSelectModal extends obsidian_1.Modal {
    constructor(app, setting, onChange) {
        super(app);
        this.onConfirm = () => { };
        this.selectedFolder = ".";
        this.setting = setting;
        this.onChange = onChange;
    }
    onOpen() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { contentEl } = this;
            contentEl.createEl("h2", { text: "选择导入文件夹" });
            // 创建文件夹选择列表
            const folderList = contentEl.createEl("select");
            folderList.style.width = "100%";
            folderList.style.marginBottom = "20px";
            // 获取所有文件夹
            const folders = [];
            const allItems = this.app.vault.getAllLoadedFiles();
            const seenFolders = new Set();
            // 添加根目录
            folders.push({ path: ".", name: "根目录" });
            // 收集所有唯一的文件夹路径
            for (const item of allItems) {
                // 检查是否为文件夹
                if (item instanceof obsidian_1.TFolder) {
                    if (!seenFolders.has(item.path) && item.path !== ".") {
                        seenFolders.add(item.path);
                        folders.push({ path: item.path, name: item.path.replace(/\//g, " > ") });
                    }
                }
                // 同时也获取文件所在的文件夹
                else if (item instanceof obsidian_1.TFile) {
                    const folderPath = item.parent.path;
                    if (!seenFolders.has(folderPath) && folderPath !== ".") {
                        seenFolders.add(folderPath);
                        folders.push({ path: folderPath, name: folderPath.replace(/\//g, " > ") });
                    }
                }
            }
            // 填充文件夹选择列表
            for (const folder of folders) {
                const option = document.createElement("option");
                option.value = folder.path;
                option.textContent = folder.name;
                folderList.appendChild(option);
            }
            folderList.addEventListener("change", (evt) => {
                this.selectedFolder = evt.target.value;
            });
            // 创建按钮容器
            const buttonContainer = contentEl.createDiv();
            buttonContainer.style.display = "flex";
            buttonContainer.style.justifyContent = "flex-end";
            buttonContainer.style.gap = "10px";
            // 取消按钮
            const cancelButton = buttonContainer.createEl("button");
            cancelButton.textContent = "取消";
            cancelButton.addEventListener("click", () => this.close());
            // 确认按钮
            const confirmButton = buttonContainer.createEl("button");
            confirmButton.textContent = "选择";
            confirmButton.addEventListener("click", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const textInput = this.setting.controlEl.querySelector('input[type="text"]');
                if (textInput) {
                    // 确保路径格式正确
                    let formattedPath = this.selectedFolder;
                    if (formattedPath !== ".") {
                        formattedPath = `./${formattedPath}`;
                    }
                    textInput.value = formattedPath;
                    yield this.onChange(formattedPath);
                }
                this.close();
            }));
        });
    }
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
// 设置选项卡类
class FileImportManagerSettingTab extends obsidian_1.PluginSettingTab {
    // 导出配置功能
    exportConfig() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // 创建JSON配置字符串
                const configStr = JSON.stringify(this.plugin.settings, null, 2);
                // 创建Blob对象
                const blob = new Blob([configStr], { type: 'application/json' });
                // 创建下载链接
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `file-import-manager-config-${(0, obsidian_1.moment)().format('YYYY-MM-DD_HH-mm-ss')}.json`;
                // 触发下载
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // 释放URL对象
                URL.revokeObjectURL(url);
                new obsidian_1.Notice('配置导出成功！');
            }
            catch (error) {
                console.error('导出配置失败:', error);
                new obsidian_1.Notice('配置导出失败，请查看控制台');
            }
        });
    }
    // 导入配置功能
    importConfig() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // 创建文件选择器
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                // 文件选择事件处理
                input.onchange = (event) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file)
                        return;
                    try {
                        // 读取文件内容
                        const content = yield new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = (e) => { var _a; return resolve((_a = e.target) === null || _a === void 0 ? void 0 : _a.result); };
                            reader.onerror = reject;
                            reader.readAsText(file);
                        });
                        // 解析JSON配置
                        const importedSettings = JSON.parse(content);
                        // 验证配置格式
                        if (!importedSettings || typeof importedSettings !== 'object') {
                            throw new Error('无效的配置文件格式');
                        }
                        // 应用导入的设置
                        this.plugin.settings = Object.assign(Object.assign({}, this.plugin.settings), importedSettings);
                        yield this.plugin.saveSettings();
                        // 刷新设置页面
                        this.display();
                        // 更新拖放处理器
                        this.plugin.updateDragDropHandler();
                        new obsidian_1.Notice('配置导入成功！');
                    }
                    catch (error) {
                        console.error('导入配置失败:', error);
                        new obsidian_1.Notice('配置导入失败，请检查文件格式');
                    }
                });
                // 触发文件选择对话框
                input.click();
            }
            catch (error) {
                console.error('打开文件选择器失败:', error);
                new obsidian_1.Notice('打开文件选择器失败');
            }
        });
    }
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        const isPluginEnabled = this.plugin.settings.enabled;
        containerEl.empty();
        // 设置标题为一级标题，加粗并左对齐
        const title = containerEl.createEl('h1', { text: '文件导入管理器设置' });
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '20px';
        // 添加配置导出导入按钮容器
        const configButtonsContainer = containerEl.createDiv();
        configButtonsContainer.style.display = 'flex';
        configButtonsContainer.style.justifyContent = 'flex-end';
        configButtonsContainer.style.marginBottom = '20px';
        configButtonsContainer.style.gap = '10px';
        // 导出配置按钮
        const exportButton = configButtonsContainer.createEl('button', {
            text: '导出配置'
        });
        exportButton.addClass('mod-cta');
        exportButton.onclick = this.exportConfig.bind(this);
        // 导入配置按钮
        const importButton = configButtonsContainer.createEl('button', {
            text: '导入配置'
        });
        importButton.onclick = this.importConfig.bind(this);
        // 添加功能分割线以区分设置区域
        const separatorTop = containerEl.createDiv();
        separatorTop.style.height = '2px';
        separatorTop.style.backgroundColor = 'var(--background-modifier-border)';
        separatorTop.style.margin = '20px 0';
        separatorTop.style.borderRadius = '1px';
        // 重命名功能设置分组
        const renameSettingsContainer = containerEl.createDiv('rename-settings');
        renameSettingsContainer.createEl('h3', { text: '文件重命名设置' });
        renameSettingsContainer.createEl('p', { text: '配置导入文件时的重命名规则' });
        // 启用/禁用重命名功能
        new obsidian_1.Setting(renameSettingsContainer)
            .setName('启用文件重命名')
            .setDesc('导入文件时是否自动重命名')
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.renameEnabled)
            .onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.renameEnabled = value;
            yield this.plugin.saveSettings();
        })));
        // 文件名模式设置
        new obsidian_1.Setting(renameSettingsContainer)
            .setName('文件名模式')
            .setDesc('自定义文件名格式，支持 ${DATE}, ${FULL_DATE_TIME}, ${YEAR}, ${MONTH}, ${DAY}, ${TIME}, ${ORIGINAL_NAME} 变量')
            .addText(text => text
            .setValue(this.plugin.settings.namePattern)
            .setPlaceholder('附件-${DATE}')
            .onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.namePattern = value;
            yield this.plugin.saveSettings();
        })));
        // 重复数字位置设置
        new obsidian_1.Setting(renameSettingsContainer)
            .setName('重复数字位置')
            .setDesc('当文件名重复时，数字序号的位置')
            .addDropdown(dropdown => dropdown
            .addOption('prefix', '前缀')
            .addOption('suffix', '后缀')
            .setValue(this.plugin.settings.duplicateNumberPosition)
            .onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.duplicateNumberPosition = value;
            yield this.plugin.saveSettings();
        })));
        // 重复数字分隔符设置
        new obsidian_1.Setting(renameSettingsContainer)
            .setName('重复数字分隔符')
            .setDesc('数字序号与文件名之间的分隔符')
            .addText(text => text
            .setValue(this.plugin.settings.duplicateNumberSeparator)
            .setPlaceholder('空格')
            .onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.duplicateNumberSeparator = value;
            yield this.plugin.saveSettings();
        })));
        // 重命名模板说明
        const templateHelp = renameSettingsContainer.createDiv();
        templateHelp.style.marginTop = '10px';
        templateHelp.style.padding = '10px';
        templateHelp.style.backgroundColor = 'var(--background-secondary-alt)';
        templateHelp.style.borderRadius = '4px';
        templateHelp.createEl('strong', { text: '可用变量说明:' });
        const templateList = templateHelp.createEl('ul');
        templateList.style.marginTop = '5px';
        templateList.style.marginLeft = '20px';
        templateList.createEl('li', { text: '${DATE}: 日期 (YYYY-MM-DD)' });
        templateList.createEl('li', { text: '${DATE:format}: 自定义格式日期 (使用Moment.js格式)' });
        templateList.createEl('li', { text: '${FULL_DATE_TIME}: 完整日期时间 (YYYY-MM-DD_HH-mm-ss)' });
        templateList.createEl('li', { text: '${YEAR}: 年份 (YYYY)' });
        templateList.createEl('li', { text: '${MONTH}: 月份 (MM)' });
        templateList.createEl('li', { text: '${DAY}: 日期 (DD)' });
        templateList.createEl('li', { text: '${TIME}: 时间 (HH-mm-ss)' });
        templateList.createEl('li', { text: '${ORIGINAL_NAME}: 原始文件名（不含扩展名）' });
        templateList.createEl('li', { text: '${fileName}: 当前活动文件的名称（不含.md扩展名）' });
        templateList.createEl('li', { text: '${imageNameKey}: 从当前文件frontmatter中读取的自定义键值' });
        templateList.createEl('li', { text: '${dirName}: 当前活动文件所在目录名' });
        templateList.createEl('li', { text: '${firstHeading}: 当前活动文件的一级标题' });
        // 添加粗分割线以区分文件类别设置与上文
        const thickSeparator = containerEl.createDiv();
        thickSeparator.style.height = '3px';
        thickSeparator.style.backgroundColor = 'var(--background-modifier-border)';
        thickSeparator.style.margin = '20px 0';
        thickSeparator.style.borderRadius = '1.5px';
        thickSeparator.style.opacity = '0.8';
        // 文件类别设置
        const categoriesContainer = containerEl.createDiv('file-categories');
        categoriesContainer.createEl('h3', { text: '文件类别设置' });
        // 默认导入文件夹设置 - 移动到文件类别设置与描述之间
        const defaultFolderSetting = new obsidian_1.Setting(categoriesContainer)
            .setName('默认导入文件夹')
            .setDesc('当文件类型没有特定类别时使用的文件夹');
        // 添加带文件夹搜索功能的输入框
        this.addFolderSearchInput(defaultFolderSetting, this.plugin.settings.defaultFolder, (value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.defaultFolder = value;
            yield this.plugin.saveSettings();
        }));
        // 添加细分割线以区分默认导入文件夹与下文
        const thinSeparator = categoriesContainer.createDiv();
        thinSeparator.style.height = '1px';
        thinSeparator.style.backgroundColor = 'var(--background-modifier-border)';
        thinSeparator.style.margin = '12px 0';
        thinSeparator.style.borderRadius = '0.5px';
        thinSeparator.style.opacity = '0.6';
        categoriesContainer.createEl('p', { text: '为不同类别的文件指定特定的导入文件夹' });
        // 显示当前文件类别
        for (const category of this.plugin.settings.fileCategories) {
            const categoryContainer = categoriesContainer.createDiv('file-category-item');
            categoryContainer.style.marginBottom = '16px';
            categoryContainer.style.padding = '12px';
            categoryContainer.style.border = '1px solid var(--background-modifier-border)';
            categoryContainer.style.borderRadius = '4px';
            categoryContainer.style.backgroundColor = 'var(--background-secondary)';
            // 类别名称
            categoryContainer.createEl('h4', {
                text: category.name,
                cls: 'setting-item-name'
            });
            // 显示扩展名列表
            const extensionsContainer = categoryContainer.createDiv({
                cls: 'setting-item-description'
            });
            // 显示扩展名
            extensionsContainer.createSpan({ text: '扩展名: ' });
            // 创建一个容器来存放每个扩展名及其删除按钮
            const extensionsList = extensionsContainer.createDiv();
            extensionsList.style.display = 'flex';
            extensionsList.style.flexWrap = 'wrap';
            extensionsList.style.gap = '6px';
            // 定义默认的扩展名（不能删除的）
            const defaultExtensions = {
                'images': ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
                'audio': ['.mp3', '.wav'],
                'video': ['.mp4', '.mov'],
                'pdf': ['.pdf']
            };
            // 判断一个扩展名是否可以删除
            const isExtensionDeletable = (ext) => {
                // 只有预设类别中的非默认扩展名才可以删除
                if (['images', 'audio', 'video', 'pdf'].includes(category.id)) {
                    const defaults = defaultExtensions[category.id] || [];
                    return !defaults.includes(ext);
                }
                // 自定义类别中的所有扩展名都可以删除
                return true;
            };
            // 为每个扩展名创建显示元素和删除按钮
            category.extensions.forEach((ext, index) => {
                const extContainer = extensionsList.createDiv();
                extContainer.style.display = 'flex';
                extContainer.style.alignItems = 'center';
                extContainer.style.gap = '4px';
                // 显示扩展名
                extContainer.createSpan({ text: ext });
                // 如果扩展名可以删除，添加删除按钮
                if (isExtensionDeletable(ext)) {
                    const deleteButton = extContainer.createEl('button', {
                        text: '×',
                        cls: 'mod-cta mod-small',
                        attr: { 'aria-label': `删除扩展名 ${ext}` }
                    });
                    deleteButton.style.padding = '0 4px';
                    deleteButton.style.minWidth = 'auto';
                    deleteButton.style.backgroundColor = 'var(--background-modifier-error)';
                    deleteButton.addEventListener('click', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        // 创建一个确认对话框
                        const confirmModal = new obsidian_1.Modal(this.app);
                        confirmModal.titleEl.setText(`确认删除扩展名`);
                        confirmModal.contentEl.createEl('p', {
                            text: `确定要删除扩展名 ${ext} 吗？`
                        });
                        const buttonContainer = confirmModal.contentEl.createDiv();
                        buttonContainer.style.display = 'flex';
                        buttonContainer.style.justifyContent = 'flex-end';
                        buttonContainer.style.gap = '8px';
                        buttonContainer.style.marginTop = '16px';
                        // 取消按钮
                        const cancelBtn = buttonContainer.createEl('button', { text: '取消' });
                        cancelBtn.style.padding = '4px 8px';
                        cancelBtn.addEventListener('click', () => confirmModal.close());
                        // 确认删除按钮
                        const confirmBtn = buttonContainer.createEl('button', { text: '删除' });
                        confirmBtn.style.padding = '4px 8px';
                        confirmBtn.style.backgroundColor = 'var(--background-modifier-error)';
                        confirmBtn.style.color = 'var(--text-on-accent)';
                        confirmBtn.addEventListener('click', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            // 从类别中移除扩展名
                            category.extensions = category.extensions.filter(e => e !== ext);
                            yield this.plugin.saveSettings();
                            this.display();
                            confirmModal.close();
                            new obsidian_1.Notice(`已删除扩展名 ${ext}`);
                        }));
                        confirmModal.open();
                    }));
                }
                // 如果不是最后一个扩展名，添加逗号
                if (index < category.extensions.length - 1) {
                    extensionsList.createSpan({ text: ',' });
                }
            });
            // 为预设类别添加"添加扩展名"按钮
            if (['images', 'audio', 'video', 'pdf'].includes(category.id)) {
                const addExtButton = extensionsContainer.createEl('button', {
                    text: '添加扩展名',
                    cls: 'mod-cta mod-small'
                });
                addExtButton.style.marginLeft = '12px';
                addExtButton.style.padding = '2px 8px';
                addExtButton.addEventListener('click', () => {
                    const modal = new obsidian_1.Modal(this.app);
                    modal.titleEl.setText(`为 ${category.name} 添加扩展名`);
                    // 创建输入框容器
                    const inputContainer = modal.contentEl.createDiv();
                    inputContainer.style.display = 'flex';
                    inputContainer.style.flexDirection = 'column';
                    inputContainer.style.gap = '12px';
                    // 扩展名输入框
                    inputContainer.createEl('label', { text: '请输入新的文件扩展名（以.开头）:' });
                    const extInput = inputContainer.createEl('input', {
                        type: 'text',
                        placeholder: '例如：.webp,.tiff'
                    });
                    extInput.style.padding = '8px';
                    extInput.style.borderRadius = '4px';
                    extInput.style.border = '1px solid var(--background-modifier-border)';
                    // 按钮容器
                    const buttonContainer = modal.contentEl.createDiv();
                    buttonContainer.style.display = 'flex';
                    buttonContainer.style.justifyContent = 'flex-end';
                    buttonContainer.style.gap = '8px';
                    buttonContainer.style.marginTop = '16px';
                    // 取消按钮
                    const cancelButton = buttonContainer.createEl('button', { text: '取消' });
                    cancelButton.style.padding = '8px 16px';
                    cancelButton.addEventListener('click', () => modal.close());
                    // 确认按钮
                    const confirmButton = buttonContainer.createEl('button', { text: '确认' });
                    confirmButton.style.padding = '8px 16px';
                    confirmButton.style.backgroundColor = 'var(--interactive-accent)';
                    confirmButton.style.color = 'var(--text-on-accent)';
                    confirmButton.style.borderRadius = '4px';
                    confirmButton.addEventListener('click', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const extStr = extInput.value.trim();
                        if (!extStr) {
                            new obsidian_1.Notice('请输入文件扩展名');
                            return;
                        }
                        const newExtensions = extStr.split(',').map((ext) => ext.trim()).filter((ext) => ext.startsWith('.'));
                        if (newExtensions.length === 0) {
                            new obsidian_1.Notice('请输入有效的文件扩展名（以.开头）');
                            return;
                        }
                        // 检查是否有重复的扩展名
                        const existingExtensions = new Set(category.extensions);
                        const uniqueNewExtensions = newExtensions.filter((ext) => !existingExtensions.has(ext));
                        if (uniqueNewExtensions.length === 0) {
                            new obsidian_1.Notice('所有扩展名都已存在');
                            return;
                        }
                        // 添加新扩展名
                        category.extensions = [...category.extensions, ...uniqueNewExtensions];
                        yield this.plugin.saveSettings();
                        this.display();
                        modal.close();
                        new obsidian_1.Notice(`已成功添加 ${uniqueNewExtensions.length} 个扩展名`);
                    }));
                    // 显示对话框
                    modal.open();
                });
            }
            // 文件夹路径设置
            const folderSetting = new obsidian_1.Setting(categoryContainer)
                .setName('导入文件夹')
                .setDesc(`设置 ${category.name} 的导入位置`);
            this.addFolderSearchInput(folderSetting, category.folderPath, (newPath) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                category.folderPath = newPath;
                yield this.plugin.saveSettings();
            }));
            // 删除按钮（非预设类别可以删除）
            if (!['images', 'audio', 'video', 'pdf'].includes(category.id)) {
                const actionContainer = categoryContainer.createDiv({
                    cls: 'setting-item-control'
                });
                actionContainer.createEl('button', {
                    text: '删除',
                    cls: 'mod-cta mod-warning',
                    attr: {
                        'aria-label': `删除 ${category.name} 类别`
                    }
                }).addEventListener('click', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.fileCategories = this.plugin.settings.fileCategories.filter(c => c.id !== category.id);
                    yield this.plugin.saveSettings();
                    this.display();
                }));
            }
        }
        // 添加新类别按钮
        const addCategorySetting = new obsidian_1.Setting(containerEl)
            .addButton(button => button
            .setButtonText('添加自定义文件类别')
            .onClick(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 创建一个自定义对话框来替代prompt
            const modal = new obsidian_1.Modal(this.app);
            // 设置对话框标题
            modal.titleEl.setText('添加自定义文件类别');
            // 创建表单容器
            const formContainer = modal.contentEl.createDiv();
            formContainer.style.display = 'flex';
            formContainer.style.flexDirection = 'column';
            formContainer.style.gap = '12px';
            // 类别名称输入框
            formContainer.createEl('label', { text: '类别名称:' });
            const nameInput = formContainer.createEl('input', {
                type: 'text',
                placeholder: '例如：文档文件'
            });
            nameInput.style.padding = '8px';
            nameInput.style.borderRadius = '4px';
            nameInput.style.border = '1px solid var(--background-modifier-border)';
            // 扩展名输入框
            formContainer.createEl('label', { text: '文件扩展名（用逗号分隔）:' });
            const extensionsInput = formContainer.createEl('input', {
                type: 'text',
                placeholder: '例如：.doc,.docx,.txt'
            });
            extensionsInput.style.padding = '8px';
            extensionsInput.style.borderRadius = '4px';
            extensionsInput.style.border = '1px solid var(--background-modifier-border)';
            // 文件夹路径输入框
            formContainer.createEl('label', { text: '目标文件夹路径:' });
            const folderInput = formContainer.createEl('input', {
                type: 'text',
                placeholder: '例如：./documents'
            });
            folderInput.style.padding = '8px';
            folderInput.style.borderRadius = '4px';
            folderInput.style.border = '1px solid var(--background-modifier-border)';
            // 创建操作按钮容器
            const buttonContainer = modal.contentEl.createDiv();
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'flex-end';
            buttonContainer.style.gap = '8px';
            buttonContainer.style.marginTop = '16px';
            // 取消按钮
            const cancelButton = buttonContainer.createEl('button', { text: '取消' });
            cancelButton.style.padding = '8px 16px';
            cancelButton.addEventListener('click', () => {
                modal.close();
            });
            // 确认按钮
            const confirmButton = buttonContainer.createEl('button', { text: '确认' });
            confirmButton.style.padding = '8px 16px';
            confirmButton.style.backgroundColor = 'var(--interactive-accent)';
            confirmButton.style.color = 'var(--text-on-accent)';
            confirmButton.style.borderRadius = '4px';
            confirmButton.addEventListener('click', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const name = nameInput.value.trim();
                if (!name) {
                    new obsidian_1.Notice('请输入类别名称');
                    return;
                }
                const extensionsStr = extensionsInput.value.trim();
                if (!extensionsStr) {
                    new obsidian_1.Notice('请输入文件扩展名');
                    return;
                }
                const extensions = extensionsStr.split(',').map((ext) => ext.trim()).filter((ext) => ext.startsWith('.'));
                if (extensions.length === 0) {
                    new obsidian_1.Notice('请输入有效的文件扩展名（以.开头）');
                    return;
                }
                const folder = folderInput.value.trim();
                if (!folder) {
                    new obsidian_1.Notice('请输入目标文件夹路径');
                    return;
                }
                // 生成唯一ID
                const id = 'custom_' + Date.now();
                // 添加新类别
                this.plugin.settings.fileCategories.push({
                    id,
                    name,
                    extensions,
                    folderPath: folder
                });
                yield this.plugin.saveSettings();
                this.display();
                modal.close();
            }));
            // 显示对话框
            modal.open();
        })));
        // 如果插件已启用，禁用添加新类别按钮
        if (isPluginEnabled) {
            const addCategoryButton = addCategorySetting.settingEl.querySelector('button.mod-cta');
            if (addCategoryButton) {
                addCategoryButton.disabled = true;
                addCategoryButton.style.opacity = '0.5';
            }
        }
    }
    // 添加使用Obsidian内部文件夹选择器的输入框
    addFolderSearchInput(setting, initialValue, onChange) {
        // 使用Obsidian的Setting.addText和addButton方法来创建更原生的体验
        setting.addText(text => {
            text.setValue(initialValue)
                .setPlaceholder('./imports')
                .onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield onChange(value);
            }));
        }).addDropdown((dropdown) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 获取所有文件夹
            const folders = [];
            const allItems = this.app.vault.getAllLoadedFiles();
            const seenFolders = new Set();
            // 添加根目录
            folders.push({ path: '.', name: '根目录' });
            // 收集所有唯一的文件夹路径
            for (const item of allItems) {
                // 检查是否为文件夹
                if (item instanceof obsidian_1.TFolder) {
                    if (!seenFolders.has(item.path) && item.path !== '.') {
                        seenFolders.add(item.path);
                        folders.push({ path: item.path, name: item.path.replace(/\//g, ' > ') });
                    }
                }
                // 同时也获取文件所在的文件夹
                else if (item instanceof obsidian_1.TFile) {
                    const folderPath = item.parent.path;
                    if (!seenFolders.has(folderPath) && folderPath !== '.') {
                        seenFolders.add(folderPath);
                        folders.push({ path: folderPath, name: folderPath.replace(/\//g, ' > ') });
                    }
                }
            }
            // 填充文件夹选择下拉列表
            for (const folder of folders) {
                dropdown.addOption(folder.path, folder.name);
            }
            // 设置默认值
            const matchingFolder = folders.find(f => f.path === initialValue.replace('./', ''));
            if (matchingFolder) {
                dropdown.setValue(matchingFolder.path);
            }
            // 设置变更处理
            dropdown.onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let formattedPath = value;
                if (formattedPath !== '.') {
                    formattedPath = `./${formattedPath}`;
                }
                const textInput = setting.controlEl.querySelector('input[type="text"]');
                if (textInput) {
                    textInput.value = formattedPath;
                }
                yield onChange(formattedPath);
            }));
        }));
        return setting;
    }
}

import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Execute } from './execute'
  
// declare type EditorType = typeof Editor
// declare type MarkdownViewType = typeof MarkdownView
declare type AppType = typeof App

interface InputsPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: InputsPluginSettings = {
	mySetting: 'default'
}

export default class InputsPlugin extends Plugin {
	settings: InputsPluginSettings

	//@ts-ignore Error Becasue of async, too lazy to fix
	async onload() {
		await this.loadSettings()
		// @ts-ignore
		this.registerMarkdownCodeBlockProcessor("execute-js", async (source, el, ctx) => {
			Execute.executeJS(source, el)

		})
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class InputsSettingTab extends PluginSettingTab {
	plugin: InputsPlugin;

	constructor(app: AppType, plugin: InputsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

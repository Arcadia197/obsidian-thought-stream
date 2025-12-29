import WhisperBuddy from "../main";
import OpenAI from "openai";


export class AiClient {
	private plugin: WhisperBuddy;
	public readonly  client: OpenAI;

	constructor(plugin: WhisperBuddy) {
		this.plugin = plugin;

		this.client = this.createClient();

		this.plugin.settingsManager.$changedSettings.subscribe(() => {
			this.client.baseURL = this.plugin.settings.openaiApiUrl || "https://api.openai.com/v1";
			this.client.apiKey = this.plugin.settings.openaiApiKey;
		});
	}

	private createClient() {
		return new OpenAI({
			apiKey: this.plugin.settings.openaiApiKey,
			baseURL: this.plugin.settings.openaiApiUrl || "https://api.openai.com/v1",
			dangerouslyAllowBrowser: true
		});
	}
}

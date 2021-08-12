module.exports = {

		devServer: {
				port: 8080
		},

		pluginOptions: {
				i18n: {
						locale: 'en',
						fallbackLocale: 'en',
						localeDir: 'locales',
						enableLegacy: true,
						runtimeOnly: false,
						compositionOnly: true,
						fullInstall: true
				}
		}
}

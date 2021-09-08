const {
		PROJECT_STATUS_ONGOING,
		PROJECT_STATUS_PLANNING,
		PROJECT_STATUS_ABANDONED,
		PROJECT_STATUS_ENDED,
		PROJECT_STATUS_PROPOSAL
} = require("@/enums/projectStatus");

module.exports = Object.freeze({

		TEAMS: [ // TODO Remove
				{
						uuid: '4287bb3a-ff7c-44dd-b68e-73e0fa98948a',
						name: 'Blue Team',
						color: 'blue',
						ownerUuid: '2ce7e518-078d-4b82-970d-fb8b9e95b144',
						relation: 'mandates',
						grade: 4.7,
						status
				},
				{ uuid: '8373662e-3dbe-43b1-bbd2-a6cf1710b41c', name: 'Red Team', color: 'red', relation: 'develops' },
				{
						uuid: '28768800-9461-47b9-9e40-fba844b154cf',
						name: 'Yellow Team',
						color: 'yellow',
						relation: 'applies',
						ownerUuid: '2ce7e518-078d-4b82-970d-fb8b9e95b144',
						grade: 3.35,
						price: 3440,
						specifications: 45
				},
				{
						uuid: '0b721a1b-9cde-49ed-9842-b6ca3b7e954f',
						name: 'Purple Team',
						color: 'purple',
						relation: 'applies',
						grade: 4.23,
						price: 3440,
						specifications: 45
				},
				{
						uuid: '5642f8ef-4a58-49ea-af56-404928badd80',
						name: 'Green Team',
						color: 'green',
						relation: 'applies',
						price: 3440,
						grade: 1.62,
						specifications: 45
				}
		],

		USERS: [ // TODO Remove
				{
						uuid: "2ce7e518-078d-4b82-970d-fb8b9e95b144",
						firstName: "Thibaud",
						lastName: "Alt",
						phone: "+41 (0) 76 415 01 24",
				},
				{
						uuid: "2ce7e518-078d-4b82-970d-404928badd80",
						firstName: "Jean",
						lastName: "Poche",
						phone: "+41 (0) 12 415 35 24",
				},
				{
						uuid: "2ce7e518-078d-4b82-970d-zba844b154cf",
						firstName: "Jules",
						lastName: "Tartempion",
						phone: "+41 (0) 76 415 01 24",
				}
		],

		PROJECTS: [ // TODO Remove
				{
						uuid: '2773512c-5dab-4a06-9f1f-838b49ebfc61',
						status: PROJECT_STATUS_ONGOING,
						deadline: new Date('10/17/2021'),
						tags: 'Web Design',
						lang: 'en',
						title: 'Project V',
						description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
				},
				{
						uuid: '04ef5039-8601-4438-978b-49e39fb2b053',
						status: PROJECT_STATUS_PLANNING,
						deadline: new Date('12/17/2021'),
						tags: 'JavaScript;TypeScript',
						lang: 'en',
						title: 'Project W',
						description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
				},
				{
						uuid: '018168b9-ceed-4828-b75a-01f6ffad4ed0',
						name: 'Project X',
						status: PROJECT_STATUS_PROPOSAL,
						deadline: new Date('01/10/2021'),
						tags: 'PHP;Laravel',
						lang: 'en',
						title: 'Project X',
						description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
				},
				{
						uuid: 'def54302-3e20-4cc1-87d8-4b463ff08af6',
						name: 'Project Y',
						status: PROJECT_STATUS_ABANDONED,
						deadline: new Date('01/01/2023'),
						tags: 'Java',
						lang: 'en',
						title: 'Project Y',
						description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. ",
						endDate: new Date('01/01/2021'),
						mark: 1.25,
				},
				{
						uuid: 'b1c38454-05cc-43a1-b430-0f3cc5456c42',
						name: 'Project Z',
						status: PROJECT_STATUS_ENDED,
						deadline: new Date('03/30/2021'),
						tags: 'iOS;Android',
						lang: 'en',
						title: 'Project Z',
						description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. ",
						endDate: new Date('03/14/2021'),
						mark: 4.5,
				}
		]
})

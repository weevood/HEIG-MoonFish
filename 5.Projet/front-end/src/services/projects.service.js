import http from '@/http';
import genUuid from "@/utils/genUuid";
import {
		PROJECT_STATUS_ABANDONED,
		PROJECT_STATUS_ENDED,
		PROJECT_STATUS_ONGOING,
		PROJECT_STATUS_PLANNING
} from "@/enums/projectStatus";

const projects = [
		{
				uuid: genUuid(),
				status: PROJECT_STATUS_ONGOING,
				deadline: new Date('10/17/2021'),
				tags: 'Web Design',
				lang: 'en',
				title: 'Project V',
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
		},
		{
				uuid: genUuid(),
				status: PROJECT_STATUS_PLANNING,
				deadline: new Date('12/17/2021'),
				tags: 'JavaScript;TypeScript',
				lang: 'en',
				title: 'Project W',
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
		},
		{
				uuid: genUuid(),
				name: 'Project X',
				status: PROJECT_STATUS_ABANDONED,
				deadline: new Date('01/10/2021'),
				tags: 'PHP;Laravel',
				lang: 'en',
				title: 'Project X',
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
		},
		{
				uuid: genUuid(),
				name: 'Project Y',
				status: PROJECT_STATUS_ONGOING,
				deadline: new Date('01/01/2023'),
				tags: 'Java',
				lang: 'en',
				title: 'Project Y',
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
		},
		{
				uuid: genUuid(),
				name: 'Project Z',
				status: PROJECT_STATUS_ENDED,
				deadline: new Date('03/30/2021'),
				tags: 'iOS;Android',
				lang: 'en',
				title: 'Project Z',
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae magna vitae ipsum molestie dapibus vel ac velit. Aenean suscipit nisi sed leo aliquam mattis. "
		}
];

class ProjectsService {

		// eslint-disable-next-line no-unused-vars
		getAll(status) {
				return new Promise((resolve) => {
						resolve(projects)
				});
				// TODO
				// if (status) {
				// 		http.get(`/projects?filters[status]=${ status }`)
				// }
				// else {
				// 		return http.get(`/projects`);
				// }
		}

		// eslint-disable-next-line no-unused-vars
		getMine(uuid, fields = '') {
				return new Promise((resolve) => {
						if (fields === 'uuid') {
								resolve([projects[0]['uuid'], projects[2]['uuid'], projects[4]['uuid']])
						}
						resolve([projects[2], projects[0], projects[4]])
				});
				// return http.get(`/projects?filters[status]=${ STATUS_ACTIVE }&relations[ARBITRATES,MANDATES,DEVELOPS]=${
				// uuid }`)
		}

		get(uuid) {
				return new Promise((resolve) => {
						resolve({ uuid, title: 'Project X' })
				});
				// return http.get(`/projects/${ uuid }`);
		}

		create(data) {
				return http.post('/projects', data);
		}

		update(uuid, data) {
				return http.patch(`/projects/${ uuid }`, data);
		}

		delete(uuid) {
				return http.delete(`/projects/${ uuid }`);
		}

}

export default new ProjectsService();

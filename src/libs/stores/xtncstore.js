import { createStore } from 'vuex'

export const store = createStore({
	modules: {
		dateactive: {
			namespaced: true,
			state(){
				return {
					active_date: {
						date: null,
						active: false,
						counter: null
					}
				}
			},
			mutations: {
				SET_ACTIVE: (state, val)=>{
					state.active_date = val
				}
			}
		},
		chat: {
			namespaced: true,
			state(){
				return {
					speed: 1
				}
			},
			mutations: {
				SET_SPEED: (state, val) => state.speed = val
			}
		}
	}
})
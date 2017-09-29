import Vue from 'vue';
import Vuex from 'vuex';
import Counter from './component/counter';
import { INCREASE } from './mutations.type.json';
Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        count: 0,
        todos: [
            { id: 1, text: 'vue basic', done: true },
            { id: 2, text: 'vue router', done: true },
            { id: 3, text: 'go home', done: false }
        ]
    },
    mutations: {
        increaseOne(state) {
            state.count++;
        },
        [INCREASE](state, params) {
            state.count += params.num;
        }
    },
    actions: {
        increment(context) {
            console.log('actions', Array.from(arguments));
            context.commit('increaseOne');
        },
        async actionsA({ commit, dispatch }) {
            await dispatch('actionsB');
            let a = { b: 1 };
            console.log({...a });
            commit(INCREASE, { num: 5 });
        },
        actionsB() {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res();
                }, 2000);
            });
        }
    },
    getters: {
        doneTodos: state => state.todos.filter(todo => todo.done),
        remainTodos: (state, getters) => state.todos.length - getters.doneTodos.length,
        getTodoById: (state) => (id) => state.todos.find(todo => todo.id == id)
    }
})

const app = new Vue({
    el: "#app",
    store,
    components: {
        Counter
    }
});

window.app = app;
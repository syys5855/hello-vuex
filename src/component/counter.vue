<template>
    <div class="panel-body">
        <span class="text-success">count:{{count}}</span>
        <span class="text-danger">countlocalData:{{countlocalData}}</span>
        <span class="text-success">remainTodos:{{remainTodos}}</span>
        <div class="btn-group">
            <button class="btn btn-primary" @click="add">increase one</button>
            <button class="btn btn-primary" @click="increase({num:10})">increase ten</button>
            <button class="btn btn-primary" @click="addAction">increase action</button>
            <button class="btn btn-primary" @click="ayncAction">async action</button>
            
        </div>

        <ul class="list-group" style="margin-top:15px;">
            <li class="list-group-item">
                <div class="form">
                    <input type="text" class="form-control" v-model="todoId" @input="getTodoById(todoId)">
                </div>
            </li>
            <li class="list-group-item" v-for="todo in getTodoById(todoId)" :key="todo.id">
                {{todo.text}}
            </li>
        </ul>
    </div>
</template>

<script>
import Vuex from 'vuex';
import _ from 'lodash';
import { INCREASE } from '../mutations.type.json'

export default {
    computed: Object.assign(
        {},
        Vuex.mapState({
            count: "count", //()=> this.$store.state.couny
            countlocalData(state) {
                return state.count + this.locCount;
            }
        }),
        Vuex.mapGetters({
            doneTodos: 'doneTodos', // this.doneToods:()=>this.$store.getters.doneToods
            remainTodos: 'remainTodos'
        })
    ),
    data() {
        return { locCount: 10, todoId: '' }
    },
    methods: Object.assign(
        {},
        {
            add() {
                this.$store.commit('increaseOne');
            },
            getTodoById(id) {
                if (!id) {
                    return this.doneTodos;
                }
                let todo = _.get(this.$store.getters, "getTodoById", () => undefined)(id);
                return todo ? Array.of(todo) : [];
            },
            addAction() {
                this.$store.dispatch('increment');
            }
        },
        Vuex.mapMutations({
            increase: INCREASE // 将 `this.increase()` 映射为 `this.$store.commit('increment')`
        }),
        Vuex.mapActions({
            addAct: 'increment', // 将 this.addAct() 映射为 this.$store.dispatch('increment')      
            async ayncAction() {
                await this.$store.dispatch('actionsA');
            }
        })
    ),
    name: 'Counter'
}
</script>

<style>

</style>

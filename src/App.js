import React, {Component} from 'react'
import './App.css'
import Header from './Components/Header'
import List from './Components/List'
import Footer from './Components/Footer'


export default class App extends Component {
  state = {
    /*todos: [
      {id: '001', name: '吃饭', done: true},
      {id: '002', name: '睡觉', done: true},
      {id: '003', name: '写代码', done: false}
    ]*/
    todos: []
  }

  componentDidMount() {
    this.setState({todos: JSON.parse(localStorage.getItem('todos')) || []})
  }

  addTodo = todoObj => {
    const {todos} = this.state
    this.newTodos = [todoObj, ...todos]
    this.setState({todos: this.newTodos})
    localStorage.setItem('todos', JSON.stringify(this.newTodos))
  }

  updateTodo = (id, done) => {
    const {todos} = this.state
    const newTodos = todos.map(todo => {
      if (todo.id === id) return {...todo, done}
      else return todo
    })
    this.setState({todos: newTodos})
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  deleteTodo = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter(todo => todo.id !== id)
    this.setState({todos: newTodos})
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  checkAllTodo = (done) => {
    const {todos} = this.state
    const newTodos = todos.map(todo => {
      return {...todo, done}
    })
    this.setState({todos: newTodos})
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  clearDoneTodo = () => {
    const {todos} = this.state
    const newTodos = todos.filter(todo => !todo.done)
    this.setState({todos: newTodos})
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  render() {
    const {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo}/>
          <List updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={todos}/>
          <Footer checkAllTodo={this.checkAllTodo} clearDoneTodo={this.clearDoneTodo} todos={todos}/>
        </div>
      </div>
    )
  }
}

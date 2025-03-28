import React from 'react';
import { FormEvent,useState } from 'react';
import {TTodo }from '../types/todo';


const Todo = () : Element => {


    const [todos, setTodos] = React.useState<TTodo[]>([
        /*{
            id:1,
            text: '마싯다!'
        } *///노란 괄호가 객체 단위이다. 이거 하나가 map의 인수인 todo 인거 
    ]);

  
    const [input, setInput] = React.useState<string>('');
    //세 가지 상태를 모두 만들엇다 
    const handleSubmit = (e:FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        const text = input.trim();

        if (text){
            const newTodo: TTodo = {id: Date.now(), text};
            setTodos((prevTodos):TTodo[] => [...prevTodos,newTodo]);
        }
    }

    const completeTodo = (todo: TTodo): void => {
        setTodos(prevTodos => prevTodos.filter((t): boolean => t.id !== todo.id));
        setDonetodos(prevDonetodos):TTodo[] => [...prevDonetodos,todo];
    }

    const deleteTodo = (todo: TTodo): void => {
        setDonetodos(prevDonetodos => 
            prevDonetodos.filter((t): boolean => t.id !== todo.id));
    }
  return (
    <div className='todo-container'>
        <h1 className='todo-container__header'>TODOTODO</h1>
        <form onSubmit={handleSubmit} className="todo-container__form">
            <input 
            value={input}
            onChange={(e): void => setInput(e.target.value)}
            type="text" 
            className="todo-container__input" 
            placeholder='할 일 입력' 
            required 
            />
            <button type="submit" className="todo-container__button">
                Add
                </button>
        </form>
        <div className="render-container">
            <div className="render-container__section">
                <h2 className="render-container__title">할일</h2>
                <ul id="todo-list" className="render-container__list">
                    {todos.map((todo) : Element =>(
                        <li key = {todo.id} className="render-container__item">
                        <span className="render-container__item-text">{todo.text}</span>
                        <button
                        onClick={():void => completeTodo(todo)}
                        style={{
                            backgroundColor: 'green'

                        }} className="render-container__item-button">삭제</button>
                    </li>
                    ) )}
                </ul>
            </div>
            <div className="render-container__section">
                <h2 className="render-container__title">완료</h2>
                <ul id="todo-list" className="render-container__list">
                {donetodos.map((todo) : Element =>(
                        <li key = {todo.id} className="render-container__item">
                        <span className="render-container__item-text">{todo.text}</span>
                        <button onClick={():void=> deleteTodo(todo)}
                        style={{
                            backgroundColor: 'red'

                        }} className="render-container__item-button">삭제</button>
                    </li>
                    ) )}
                    
                </ul>
            </div>
        </div>

        Todo 
    </div>
    
  )
}

export default Todo;

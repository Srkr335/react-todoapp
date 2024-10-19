import React, { Component } from 'react';
import "./TodoApp.css";

export default class TodoApp extends Component {
    state = {
        input: "",
        items: [],
    };

    componentDidMount() {
        const storedItems = localStorage.getItem("todoItems");
        if (storedItems) {
            this.setState({ items: JSON.parse(storedItems) });
        }
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value,
        });
    };

    storeItems = (event) => {
        event.preventDefault();
        const { input, items } = this.state;

        if (input.trim()) {
            const updatedItems = [...items, input];
            this.setState(
                {
                    items: updatedItems,
                    input: "",
                },
                () => {
                    localStorage.setItem("todoItems", JSON.stringify(updatedItems));
                }
            );
        }
    };

    deleteItem = (key) => {
        const updatedItems = this.state.items.filter((item, index) => index !== key);

        this.setState(
            {
                items: updatedItems,
            },
            () => {
                localStorage.setItem("todoItems", JSON.stringify(updatedItems));
            }
        );
    };

    render() {
        const { input, items } = this.state;
        return (
            <div className="todo-container">
                <form className="input-section" onSubmit={this.storeItems}>
                    <h1>Todo App</h1>
                    <input
                        type="text"
                        value={input}
                        onChange={this.handleChange}
                        placeholder="Enter Items..."
                    />
                </form>

                <ul>
                    {items.map((data, index) => (
                        <li key={index}>
                            {data}{" "}
                            <i
                                className="fa-solid fa-trash-can"
                                onClick={() => this.deleteItem(index)}
                            ></i>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

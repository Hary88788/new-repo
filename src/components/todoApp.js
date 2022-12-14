import { Component } from "react";
// import styles from "./css/todo_1.module.css";
import { Container, Button, Form, Col, Row, InputGroup,Card} from 'react-bootstrap';
import { AddTask } from "./addTask";
import  Confirm  from "./confirm";

export class ToDoApp extends Component{

    state = {
        tasks: [],
        checkedTasks: new Set(),
        show:  false,
        showModal: false
    }

    addTasks = (value) => {
        const inputValue = {value: value.trim(), key: this.makeid(10)};

        if(!inputValue?.value){
            return;
        }

        const tasks = [...this.state.tasks];
        tasks.push(inputValue);
        this.setState({
            value: "",
            tasks: tasks,
        });

        if(tasks.length > 0){
            this.setState({
                show:  true,
            });
         }
    }

    toggleChange = (key) =>{

      const data = new Set([...this.state.checkedTasks]);

      data.has(key) ? data.delete(key) : data.add(key);

      this.setState({
        checkedTasks: data
      });
    }

    removeTasks = ({target}) => {
       const key = target.dataset.key;
       const filteredTasks = this.state.tasks.filter(task => task.key !== key);
       const checkedTasks = this.state.checkedTasks;

       checkedTasks.delete(key);

       this.setState({
            tasks: filteredTasks,
       });
    }

    removeAllCheckedTasks = () => {

        const tasks = this.state.tasks.filter((task) => {
            // ete ka taski key checked tasksm petqa jnjenq dranq
            return !this.state.checkedTasks.has(task.key);
        });

        this.setState({
            checkedTasks: new Set(),
            tasks,
            show:  !!tasks.length,
            showModal: false
       });
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }


    render(){


        const li = this.state.tasks.map((task,index)=>{
            return (
                    <Col xl={2} lg={3} md={4} sm={6} xs={12} key={task.key} >
                        <Card>

                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>{task.value}</Card.Title>
                                    <input type="checkbox" checked={this.state.checkedTasks.has(task.key)} onChange={() => this.toggleChange(task.key)}/>
                                </div>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                <Button data-key={task.key} onClick={this.removeTasks} disabled={this.state.checkedTasks.has(task.key)} variant="outline-danger">Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                );
        });

        return(
            <>
                <AddTask
                    checkedTasksSize = {this.state.checkedTasks.size}
                    addTasks = {
                        (value) => {
                            this.addTasks(value);
                        }
                    }
                />
                {this.state.showModal && <Confirm
                    checkedTasksSize = {this.state.checkedTasks.size}
                    confirmAction = {this.removeAllCheckedTasks}
                    showModal={this.showModal}
                />}
                <Container>
                    <Col>
                        <ol className='row'>
                            {li}
                        </ol>

                        {this.state.show ? <Col className={"col-2 offset-5 mt-2"}><Button disabled={!this.state.checkedTasks.size} onClick={this.showModal}>Remove Selected</Button></Col> : null}
                    </Col>
                </Container>
            </>

        );
    }


    makeid(length = 10) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
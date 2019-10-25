import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Card from './Card';

import imgtext from '../assets/images/budget.jpg';
import imgtext1 from '../assets/images/images.jfif';
import imgtext2 from '../assets/images/todo2.png';

class Carousel extends React.Component {
constructor(props){
    super(props);
    this.state = {
        items:[
            {
                id: 0,
                title: 'Budget Tracker',
                subTitle: 'Web app to help you track your budget',
                imgSrc: imgtext,
                link: 'https://react200budgetcalc.herokuapp.com/',
                selected: false
            },
            {
                id: 1,
                title: 'Sorting Algorithm Visualizer',
                subTitle: 'Displays the inner mechanics of a sorting algorithm working on random data.',
                imgSrc: imgtext1,
                link: 'https://sortvisual.herokuapp.com/',
                selected: false
            },
            {
                id: 2,
                title: 'Productivity app',
                subTitle: 'Helps you track to-do items!',
                imgSrc: imgtext2,
                link: 'https://mi-vstda.herokuapp.com/',
                selected: false
            }
        ]

    }
}

handleCardClick(id, card){
let items = [...this.state.items];
items[id].selected = items[id].selected ? false : true;
items.forEach(item => {
    if(item.id !== id){item.selected = false;}
})

this.setState({
    items
})
}

makeItems = (items) => {
    return items.map(item => {
        return <Card item={item} click={(e=>this.handleCardClick(item.id, e))} key={item.id} />
    })
}


render(){
    return (
        <Container fluid={true}>
            <Row className='justify-content-around'>
                {this.makeItems(this.state.items)}
            </Row>
        </Container>
    )
}

}

export default Carousel
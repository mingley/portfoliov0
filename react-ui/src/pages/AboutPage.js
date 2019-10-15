import React from 'react';
import Hero from '../components/Hero'
import Content from '../components/Content';

function AboutPage(props){

    return(
        <div>
            <Hero title={props.title}/>
            <Content>
            <p>I am a Navy veteran and a current full time Computer Science student.</p><br/>
            <p>I attended San Diego Code School where I specialized in full-stack software development utilizing the MERN stack, which takes advantage of MongoDB, Express, React, and node.js technologies.</p><br/>
            <p>Current goal: By the end of 2019 I will have learned Python and produced multiple personal projects utilizing machine learning</p><br/>
            <p>Future goals: Become proficient in C++ and Java languages. Learn scripting/automation with Python. Create a multi language projects portfolio.</p><br/>
            </Content>
        </div>
    );
}

export default AboutPage;
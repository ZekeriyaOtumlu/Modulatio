import React, { Component } from 'react';
import './App.css';
import books from "./cards.json";
import Card from "./components/Card";
import Score from "./components/Score";
import Wrapper from "./components/Wrapper";


class App extends Component {
  // Setting this.state.books 
  state = {
    books,
    clickedBooksId:[],
    score: 0,
    goal: 12,
    status:""
  };

  // Shuffle the book cards in the browser when clicked

  shuffleScoreCard = id =>{
    let clickedBooksId = this.state.clickedBooksId;

    if(clickedBooksId.includes (id)){
      this.setState({ clickedBooksId:[], score:0, status: "Sorry!!! You Lost. Click to Play Again!!!"});
      return;
    } else{
      clickedBooksId.push(id)

      if(clickedBooksId.length === 12){
        this.setState({ score:12, status: "Congratulations!!! You Won!!!. Click to Play Again!!!", clickedBooksId: []});
        console.log("You Win");
        return;
      }

      this.setState({ books, clickedBooksId, score: clickedBooksId.length, status: " "});

      for (let i = books.length - 1; i >0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [books[i], books[j]] = [books[j], books[i]];
      }
    }
  }

  //  Map over this.state.cards and render a Card component for each card object
  render(){
    return(
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Clicky Game</h1>
        <p className="App-intro">
          Try not to click the same image twice!
        </p>
      </header>
      
      <Score total={this.state.score}
             goal={12}
             status={this.state.status}
             />
      <Wrapper>
        {this.state.books.map(book => (
          <Card
            shuffleScoreCard={this.shuffleScoreCard}
            id={book.id}
            key={book.id}
            image={book.image}
          />
        ))}
      </Wrapper>
   
  </div>
  );
}

}

export default App;

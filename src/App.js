import React, { Component } from "react";
import "./App.css";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inbox from "./components/Inbox";
import Sent from "./components/Sent";
import Nav from "./components/Nav";
import Details from "./components/Details";
import Pagination from "./components/Pagination";
import style from "./components/styles/style.css";

class App extends Component {
  state = {
    mail: [],
    isLoading: false,
    isReading: false,
    url: "",
    article: "",
    pop: false,
    pop2: false,
    currentPage: 1,
    total: 0,
    numberPerPage: 20,
    thisNum: 0,
    sentBox: [
      {
        id: 1,
        email: "123@hotmail.com",
        title: "123",
        content:
          "Tavelling alteration impression six all uncommonly. Chamber hearing inhabit joy highest private ask him our believe. Up nature valley do warmly. Entered of cordial do on no hearted. Yet agreed whence and unable limits. Use off him gay abilities concluded immediate allowance. Too cultivated use solicitude frequently. Dashwood likewise up consider continue entrance ladyship oh. Wrong guest given purse power is no. Friendship to connection an am considered difficulty. Country met pursuit lasting moments why calling certain the. Middletons boisterous our way understood law. Among state cease how and sight since shall. Material did pleasure breeding our humanity she contempt had. So ye really mutual no cousin piqued summer result."
      },
      {
        id: 2,
        email: "xyz@hormail.xom",
        title: "xyz",
        content:
          "在平面設計的過程中，常常會用一些無意義的假文（pseudo text）填充版面。目的是讓觀看者專注檢視排版效果，不會因為理解文句而分心。英文排版使用的假文通常由看起來像拉丁文的假詞組成，一般稱為 Lorem Ipsum。那麼，中文呢？我寫了個中文假文產生器（Chinese “Lorem Ipsum” Text Generator），可以產生由一般讀者認不得的中文字組成的假文。 這個中文假文產生器每次會產生由五個段落、每段六至八個假句組成的假文。所以，假句其實是假文的基礎。為了讓假句在視覺質地上接近真句，我準備了一個由 128 個真句組成的語料庫。每次要產生假句時就從中隨機挑選一個，然後逐字替換為隨機選出的筆畫數相同、但一般人不可能認得的低頻字。因為一般人不可能認得，實際上也算是假字了。"
      }
    ],
    cont: "",
    cont0: "",
    cont1: "",
    isAdding: false
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=100")
      .then(res => res.json())
      .then(data => {
        const content = data;
        content.map(x => {
          x.unread = true;
          return x;
        });
        this.setState({
          isLoading: false,
          mail: content,
          total: content.length
        });
      });
  }
  div1 = () => {
    this.setState({ url: "http://localhost:3000/email/inbox" });
  };
  div2 = () => {
    this.setState({ url: "http://localhost:3000/email/sent" });
  };
  read = () => {
    const indexOfLast = this.state.currentPage * this.state.numberPerPage;
    const indexOfFirst = indexOfLast - this.state.numberPerPage;
    const newArray = [...this.state.mail];
    for (let i = indexOfFirst; i < indexOfLast; i++) {
      newArray[i].unread = false;
    }
    this.setState({ mail: newArray });
  };
  unreadLength = () => {
    const newArray = [...this.state.mail];
    const newState = newArray.filter(x => x.unread == true);
    return newState.length;
  };
  open = e => {
    const newArray = [...this.state.mail];
    const index = newArray.findIndex(x => x.id == e);
    newArray[index].unread = false;
    const newArticle = newArray[index].body;
    this.setState({
      mail: newArray,
      isReading: true,
      article: newArticle,
      thisNum: e
    });
  };
  back = () => {
    this.setState({ isReading: false });
  };
  add = () => {
    this.setState({ pop: true });
  };
  change = e => {
    this.setState({ cont: e.target.value });
  };
  change0 = e => {
    this.setState({ cont0: e.target.value });
  };
  change1 = e => {
    this.setState({ cont1: e.target.value });
  };
  send = e => {
    e.preventDefault();
    this.addNewCont(this.state.cont, this.state.cont0, this.state.cont1);
    this.setState({ pop: false, cont: "", cont0: "", cont1: "" });
  };
  addNewCont = (e, a, b) => {
    this.setState({ isAdding: true });
    const newMail = {
      id: Date.now(),
      email: b,
      title: a,
      content: e
    };
    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(newMail)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newItem = data;
        const newArray = [data, ...this.state.sentBox];
        this.setState({ sentBox: newArray, isAdding: false });
      });
    /*const newMail = {
      id: Date.now(),
      email: b,
      title: a,
      content: e
    };
    const newArray = [...this.state.sentBox, newMail];
    this.setState({ sentBox: newArray,isLoading: false });*/
  };
  close = () => {
    this.setState({ pop2: true });
  };
  sure = () => {
    this.setState({ pop: false, pop2: false });
  };
  cancel = () => {
    this.setState({ pop2: false });
  };
  changePage = e => {
    this.setState({ currentPage: e });
  };
  prev = () => {
    const newPage = this.state.currentPage - 1;
    this.setState({ currentPage: newPage });
  };
  next = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({ currentPage: newPage });
  };
  past = () => {
    if (this.state.thisNum > 1) {
      const index = this.state.thisNum - 1;
      const newArray = [...this.state.mail];
      newArray[index - 1].unread = false;
      const newArticle = newArray[index - 1].body;
      this.setState({
        mail: newArray,
        article: newArticle,
        thisNum: this.state.thisNum - 1
      });
    }
  };
  forward = () => {
    if (this.state.thisNum < this.state.total) {
      const index = this.state.thisNum + 1;
      const newArray = [...this.state.mail];
      newArray[index - 1].unread = false;
      const newArticle = newArray[index - 1].body;
      this.setState({
        mail: newArray,
        article: newArticle,
        thisNum: this.state.thisNum + 1
      });
    }
  };
  sentBoxLength = () => {
    const newArray = [...this.state.sentBox];
    const length = newArray.length;
    return length;
  };
  render() {
    const div1 = {
      borderLeft:
        this.state.url == "http://localhost:3000/email/inbox" &&
        "0.5rem solid  rgb(21, 186, 245)",
      color:
        this.state.url == "http://localhost:3000/email/inbox" &&
        "rgb(21, 186, 245)",
      fontWeight:
        this.state.url == "http://localhost:3000/email/inbox" && "bold"
    };
    const div2 = {
      borderLeft:
        this.state.url == "http://localhost:3000/email/sent" &&
        "0.5rem solid  rgb(21, 186, 245)",
      color:
        this.state.url == "http://localhost:3000/email/sent" &&
        "rgb(21, 186, 245)",
      fontWeight: this.state.url == "http://localhost:3000/email/sent" && "bold"
    };
    const numberOfPages = Math.ceil(
      this.state.total / this.state.numberPerPage
    );
    const indexOfLast = this.state.currentPage * this.state.numberPerPage;
    const indexOfFirst = indexOfLast - this.state.numberPerPage;
    const onePage = this.state.mail.slice(indexOfFirst, indexOfLast);
    return (
      <React.Fragment>
        <div className="one">
          <Nav
            add={this.add}
            pop={this.state.pop}
            pop2={this.state.pop2}
            send={this.send}
            close={this.close}
            sure={this.sure}
            cancel={this.cancel}
            cont={this.state.cont}
            change={this.change}
            cont0={this.state.cont0}
            change0={this.change0}
            cont1={this.state.cont1}
            change1={this.change1}
          />
        </div>
        <Router>
          <div className="two">
            <div className="div1">
              <Link
                to="/email/inbox"
                className="inbox"
                onClick={this.div1}
                style={div1}
              >
                收件匣 ({this.unreadLength()})
              </Link>
            </div>
            <div className="div2">
              <Link
                to="/email/sent"
                className="sent"
                onClick={this.div2}
                style={div2}
              >
                寄件備份 ({this.sentBoxLength()})
              </Link>
            </div>
          </div>
          {this.state.isLoading ? (
            <div className="loadingText">載入中，請稍候...</div>
          ) : (
            <div className="three">
              {this.state.isReading ? (
                <Details
                  article={this.state.article}
                  back={this.back}
                  past={this.past}
                  forward={this.forward}
                  mail={this.state.mail}
                />
              ) : (
                <Switch>
                  <Route path="/email" exact />
                  <Route
                    path="/email/inbox"
                    render={props => (
                      <div>
                        <Inbox
                          {...props}
                          mail={onePage}
                          read={this.read}
                          open={this.open}
                          total={this.state.total}
                          first={indexOfFirst}
                          last={indexOfLast}
                        />
                        <Pagination
                          currentPage={this.state.currentPage}
                          numberOfPages={numberOfPages}
                          changePage={this.changePage}
                          prev={this.prev}
                          next={this.next}
                        />
                      </div>
                    )}
                  />
                  {this.state.isAdding ? (
                    <div className="loadingText">傳送中，請稍候...</div>
                  ) : (
                    <Route
                      path="/email/sent"
                      render={props => <Sent sentBox={this.state.sentBox} />}
                    />
                  )}
                </Switch>
              )}
            </div>
          )}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

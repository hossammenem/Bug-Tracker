import useDocumentTitle from "./useDocumentTitle";

function App() {
    useDocumentTitle('Home');
    return(
        <section id="hero" className="d-flex align-items-center">
            <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
                <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-9 text-center">
                    <h1>Create Or Join Tables And Track Your Bugs</h1>
                </div>
            </div>
            <div className="row justify-content-center" style={{ marginTop: "100px" }}>
            <div className="col-md-6 col-lg-3 d-flex mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon-box">
                <h4 className="title"><a href="">Create Table</a></h4>
                    <p className="description">When You Create A Table You Become An Admin By Default Which Gives You Some Permessions</p>
                <div style={{ display: "flex", justifyContent: "center", marginTop : "15px"}}>
                    <a className="btn btn-primary" href="/create" style={{color: 'white'}}>Create</a>
                </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="500">
                <div className="icon-box">
                    <h4 className="title"><a href="">Join Table</a></h4>
                    <p className="description">Join An Exsisting Table, You Can Join multiple Tables And Explore Them In The "Show All Tables" Tab</p>
                    <div style={{ display: "flex", justifyContent: "center", marginTop : "15px" }}>
                    <a className="btn btn-primary" href="/join" style={{ color: "#fff" }}>Join</a>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
    );
}

export default App;
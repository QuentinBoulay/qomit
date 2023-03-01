import img from "../../../img/use-case.png";

function Cases() {
  return (
    <>
      <div className="nos-realisations-container">
        <div className="row">
          <div className="col-title align-items-center d-flex col-12 col-lg-6 col-sm-12 col-xs-12">
            <h2 className="font-size-55">
              Nos<br></br> réalisations
            </h2>
          </div>
          <div className="col-use-case col-12 col-lg-6 col-sm-12 col-xs-12">
            <img src={img} alt="Use case"></img>
            <h3 className="font-size-38 my-5">
              Lorem ipsum dolor sit amet rae
            </h3>
            <p>
              Vestibulum vitae nisl non nibh pretium faucibus. Vestibulum
              facilisis, justo eu sodales tincidunt.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cases;

import HomePage from '../../components/Pages/HomePage';

function Homepage() {
  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <HomePage />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

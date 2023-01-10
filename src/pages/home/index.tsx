import './index.scss';

const Home = (): JSX.Element => {
  return (
    <div className="container">
      <div className="ba-home">
        <input type="text" placeholder="Search" className="ba-input ba-home--search" />
      </div>
    </div>
  );
};

export default Home;
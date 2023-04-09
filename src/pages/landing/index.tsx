import { Link } from 'react-router-dom';

const Landing = (): JSX.Element => (
  <main className="w-full h-[100vh] flex flex-col justify-center items-center">
    <h1 className="text-[3rem] font-bold text-center leading-[3rem]">
      <span className="text-accent">Play</span>
      <span className="text-primary">Later</span> – Your Personal Gaming Queue
    </h1>

    <Link className="btn btn-accent my-6 font-semibold" to="/auth">
      Login
    </Link>
  </main>
);

export default Landing;

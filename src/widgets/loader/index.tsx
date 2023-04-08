import './styles.scss';

const Loader = () => (
  <>
    <div className="loader before:bg-secondary">
      <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32" className="stroke-primary" />
      </svg>
    </div>

    <div className="loader triangle before:bg-secondary">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72" className="stroke-primary" />
      </svg>
    </div>

    <div className="loader before:bg-secondary">
      <svg viewBox="0 0 80 80">
        <rect x="8" y="8" width="64" height="64" className="stroke-primary" />
      </svg>
    </div>
  </>
);

export { Loader };

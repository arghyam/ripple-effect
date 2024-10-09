import React, { ChangeEvent, MouseEvent } from 'react';

interface AddButtonState {
  value: number;
}

export class AddButton extends React.Component<{}, AddButtonState> {
  private min: number;
  private max: number;

  constructor(props: {}) {
    super(props);
    this.min = 1;
    this.max = 500;
    this.state = { value: this.min };
  }
  
  handleExpand = (e: MouseEvent<HTMLSpanElement>) => {
    const parent = (e.target as HTMLSpanElement).parentNode as HTMLElement;
    parent.className += ' expanded';
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { min, max } = this;
    const v = Number(e.target.value);
    const value = v > min ? (v < max ? v : max) : min;
    this.setState({ value });
  };

  handleReduce = () => {
    const { value } = this.state;
    if (value > this.min) {
      this.setState({ value: value - 1 });
    }
  };

  handleIncrement = () => {
    const { value } = this.state;
    if (value < this.max) {
      this.setState({ value: value + 1 });
    }
  };

  handleAdd = (e: MouseEvent<HTMLSpanElement>) => {
    const parent = (e.target as HTMLSpanElement).parentNode as HTMLElement;
    parent.className = 'qtySelect';
    alert('Item was added');
    this.setState({ value: this.min });
  }

  render() {
    const { value } = this.state;
    return (
      <div className="qtySelect">
        <span className="caption" onClick={this.handleExpand}>Add to cart</span>
        <button className="reduce" onClick={this.handleReduce}>
          <ReduceSymbol />
        </button>
        <span className="add" onClick={this.handleAdd}>Add</span>
        <input className="value" value={value} onChange={this.handleChange} />
        <button className="increment" onClick={this.handleIncrement}>
          <IncrementSymbol />
        </button>
      </div>
    );
  }
}

const ReduceSymbol: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M0 12v1h23v-1h-23z" />
    </svg>
  );
};

const IncrementSymbol: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
    </svg>
  );
};

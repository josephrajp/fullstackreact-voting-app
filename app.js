const ProductList = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      sort_order: 'decreasing'
    };
  },

  componentDidMount: function () {
    this.updateState();
  },

  updateState: function () {
    console.log("Updating with sort order " + this.state.sort_order);
    const products = Data.sort((a, b) => {
      if (this.state.sort_order === 'decreasing') {
        return b.votes - a.votes;
      } else {
        return a.votes - b.votes;
      }
    });
    this.setState({ products: products });
  },

  handleSortOrderDecreasing: function () {
    this.setState({ sort_order: 'decreasing' });
    console.log("Sort order set to decreasing");
    this.updateState();
  },

  handleSortOrderIncreasing: function () {
    this.setState({ sort_order: 'increasing' });
    console.log("Sort order set to increasing");
    this.updateState();
  },

  handleProductUpVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + 1;
        console.log(productId + " was upvoted.");
        return;
      }
    });
    this.updateState();
  },

  handleProductDownVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes - 1;
        console.log(productId + " was down voted.");
        return;
      }
    });
    this.updateState();
  },

  render: function () {
    const products = this.state.products.map((product) => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onUpVote={this.handleProductUpVote}
          onDownVote={this.handleProductDownVote}
        />
      );
    });
    return (
      <div className="main">
        <div className="sort-controls">
          Sort
          <a onClick={this.handleSortOrderDecreasing}>
            <i className='large caret up icon'></i>
          </a>
          <a onClick={this.handleSortOrderIncreasing}>
            <i className='large caret down icon'></i>
          </a>
        </div>
        <div className='ui items'>
          {products}
        </div>
      </div>
    );
  },
});
    
const Product = React.createClass({
  handleUpVote: function () {
    this.props.onUpVote(this.props.id);
  },
  handleDownVote: function () {
    this.props.onDownVote(this.props.id);
  },
  render: function () {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
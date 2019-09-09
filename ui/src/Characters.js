import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default class Characters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      characters: [],
      pageCount: 0,
      meta: [],
      offset: 0,
      limit: 10,
      error: null
    };
  }

  fetchCharacters() {
    axios
      .get(
        `http://${window.location.hostname}:3000/v1/marvel/characters?limit=${this.state.limit}&offset=${this.state.offset}`
      )
      .then(response => response.data)
      .then(result => {
        this.setState({
          characters: result.data,
          meta: result.meta,
          pageCount: Math.ceil(result.meta.total / result.meta.limit),
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.limit);

    this.setState({ offset: offset, isLoading: true }, () => {
      this.fetchCharacters();
    });
  };

  render() {
    const { isLoading, characters, error, meta } = this.state;
    return (
      <React.Fragment>
        <h1>Personnages Marvel</h1>
        <h4>
          Résultats de {meta.offset} à {meta.offset + meta.count} sur{' '}
          {meta.total}
        </h4>
        {error ? <p>{error.message}</p> : null}
        <div className='pagination-container'>
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
        <br />
        <div className='flexcontainer'>
          {!isLoading ? (
            characters.map(character => {
              const { id, name, thumbnail } = character;
              return (
                <div key={id}>
                  <img
                    alt={'Personnage' + name}
                    height='100'
                    src={thumbnail.path + '.' + thumbnail.extension}
                  />
                  <p>Name: {name}</p>
                  <a href={'/characters/' + id}>En savoir plus...</a>
                </div>
              );
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </React.Fragment>
    );
  }
}

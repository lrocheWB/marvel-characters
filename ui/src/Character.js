import React from 'react';
import axios from 'axios';

export default class Character extends React.Component {
  state = {
    isLoading: true,
    character: [],
    error: null
  };

  fetchCharacter() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(
        `http://${window.location.hostname}:3000/v1/marvel/characters/${params.id}`
      )
      .then(response => response.data)
      .then(result => {
        this.setState({
          character: result.data,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchCharacter();
  }

  render() {
    const { isLoading, character, error } = this.state;
    return (
      <React.Fragment>
        {error ? <p>{error.message}</p> : null}
        <div>
          {!isLoading ? (
            <div key={character[0].id}>
              <h2>{character[0].name}</h2>
              <p>{character[0].description}</p>
              <img
                alt={'Personnage' + character[0].name}
                src={
                  character[0].thumbnail.path +
                  '.' +
                  character[0].thumbnail.extension
                }
              />
            </div>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </React.Fragment>
    );
  }
}

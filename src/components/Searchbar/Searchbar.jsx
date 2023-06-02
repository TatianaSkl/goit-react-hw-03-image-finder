import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import { Header, SearchForm, ButtonForm, ButtonLabel, InputForm } from './Searchbar.styled';

export class Searchbar extends React.Component {
  state = {
    searchText: '',
  };

  handleChange = e => {
    this.setState({ searchText: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchText.trim() === '') {
      toast.error("Sorry, the search string can't be empty. Please try again.");
      return;
    }
    this.props.onSubmit(this.state.searchText);
    this.setState({ searchText: '' });
  };

  render() {
    const { searchText } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <ButtonForm type="submit">
            <ButtonLabel>
              <AiOutlineSearch />
            </ButtonLabel>
          </ButtonForm>

          <InputForm
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={searchText}
          />
        </SearchForm>
      </Header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

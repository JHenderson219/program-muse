// import React from 'react';

// class Search extends React.Component {
//   initSearch = () => {
//     store.dispatch({type: 'VIDEO_SEARCH'});
//   }
//   handleInput = (event) => {
//     store.dispatch(
//       {
//         type: 'UPDATE_SEARCH',
//         search: event.target.value
//       });
//   }
//   render() {
//     return (
//       <div>
//         <label htmlFor='search'> Search Youtube </label>
//         <input onChange={this.handleInput} name='search' type='text'></input>
//         <SearchButton onClick={this.initSearch}></SearchButton>
//       </div>
//     );
//   }
// }
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../../../../store/searchSlice'; // Adjust the path as necessary

// Material-UI Components
import { useTheme } from '@mui/material/styles';
import { alpha, Box, Button, InputBase, Popper, Fade, Card, CardContent, Grid } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

// Icons
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const SearchSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.search.data); // Access search results from Redux store
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      dispatch(fetchSearchResults(inputValue));
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        backgroundColor: { sm: alpha(theme.palette.common.white, 0.15), xs: 'transparent' },
        '&:hover': {
          backgroundColor: { sm: alpha(theme.palette.common.white, 0.25), xs: 'transparent' }
        },
        ml: { sm: theme.spacing(1), xs: 0 },
        mr: { sm: theme.spacing(2), xs: 0 },
        width: 'auto'
      }}
    >
      <PopupState variant="popper" popupId="demo-popup-popper">
        {(popupState) => (
          <>
            <Button
              sx={{ minWidth: { xs: 35 } }}
              aria-haspopup="true"
              {...bindToggle(popupState)}
              color="inherit"
              onClick={handleSearch}
            >
              <SearchTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </Button>
            <Popper
              {...bindPopper(popupState)}
              transition
              sx={{ zIndex: 1100, width: '100%', top: '10px !important', p: 0 }}
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [0, 10]
                  }
                },
                {
                  name: 'preventOverflow',
                  options: {
                    altAxis: true
                  }
                }
              ]}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Card
                    sx={{
                      borderRadius: 0,
                      background: theme.palette.primary[200],
                      border: { sm: 0 },
                      boxShadow: { sm: 'none' }
                    }}
                  >
                    <CardContent sx={{ p: 1.5, backgroundColor: theme.palette.secondary.main }}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs>
                          <Box display="flex" p={0}>
                            <Box
                              sx={{
                                p: { sm: theme.spacing(0.75, 1.25), xs: theme.spacing(1.25) },
                                position: 'absolute',
                                pointerEvents: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: theme.palette.grey[100]
                              }}
                            >
                              <SearchTwoToneIcon color="inherit" />
                            </Box>
                            <InputBase
                              fullWidth
                              placeholder="Search…"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                              sx={{
                                '& .MuiInputBase-root': {
                                  color: 'inherit'
                                },
                                '& .MuiInputBase-input': {
                                  padding: theme.spacing(1, 1, 1, 0),
                                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                                  transition: theme.transitions.create('width'),
                                  color: theme.palette.grey[100],
                                  width: { sm: '100%', md: 125 },
                                  mr: 3,
                                  '&:focus': {
                                    width: { md: 225 }
                                  }
                                }
                              }}
                              inputProps={{ 'aria-label': 'search' }}
                            />
                            <Box
                              sx={{
                                cursor: 'pointer',
                                p: theme.spacing(1.25),
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                display: 'flex',
                                color: theme.palette.grey[100]
                              }}
                              {...bindToggle(popupState)}
                            >
                              <CloseTwoToneIcon color="inherit" />
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Fade>
              )}
            </Popper>
          </>
        )}
      </PopupState>
    </Box>
  );
};

export default SearchSection;

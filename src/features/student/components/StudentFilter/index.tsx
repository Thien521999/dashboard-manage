import { Search } from '@mui/icons-material';
import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';
import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];

  onchange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const StudentFilter: React.FC<StudentFilterProps> = ({
  filter,
  cityList,
  onchange,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef: any = useRef(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSearchChange) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newFilter: ListParams = {
        ...filter,
        name_like: value,
        _page: 1,
      };
      onSearchChange(newFilter);
    }, 300);
  };

  const handleCityChange = (e: SelectChangeEvent) => {
    if (!onchange) return;

    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
      _page: 1,
    };

    onchange(newFilter);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    if (!onchange) return;
    const value = e.target.value;

    const [_sort, _order] = value.split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onchange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onchange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onchange(newFilter);

    setSearchTerm('');
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel htmlFor="SearchByName">Search by name</InputLabel>
            <OutlinedInput
              id="SearchByName"
              endAdornment={<Search color="primary" />}
              label="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel id="Filter by city label">Filter by city</InputLabel>
            <Select
              labelId="Filter by city label"
              id="Filter by city"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList?.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel id="Sort by">Sort</InputLabel>
            <Select
              labelId="Sort by"
              id="Sort by name - mark"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
              CLEAR
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;

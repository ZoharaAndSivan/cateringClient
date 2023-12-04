import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchButton({ search }) {
  const [value, setValue] = React.useState("");
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 200 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="חיפוש לפי שם"
        inputProps={{ "aria-label": "חיפוש" }}
        onBlur={search}
        onChange={({ target }) => setValue(target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            search({ target: { value: value } });
          }
        }}
      />
      <IconButton
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => search({ target: { value: value } })}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

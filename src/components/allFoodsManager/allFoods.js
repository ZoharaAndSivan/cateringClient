import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AlertMessage from "../AlertMessage";
import Alerts from "../Alerts";
import Model from "./model";
import { useState, useEffect } from "react";
import {
    addFood,
  changeActiveFood,
  getAllFood,
  getAllFoodType,
} from "../../service/event";
import SelectInput from "../selectInput";
import FoodSingle from "./FoodSingle";
import SearchButton from "../SearchButton";

function createData(Id, Name, FoodTypeId, Price, Image, Active) {
  return {
    Id,
    Name,
    FoodTypeId,
    Price,
    Image,
    Active,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "Image",
    numeric: true,
    disablePadding: true,
    label: "תמונה",
  },
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "שם",
  },
  {
    id: "Price",
    numeric: true,
    disablePadding: true,
    label: "מחיר",
  },
  {
    id: "Active",
    numeric: true,
    disablePadding: true,
    label: "האם פעיל",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <strong> {headCell.label}</strong>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {
    setNumSelected,
    numSelected,
    selected,
    rows,
    setRows,
    setSelected,
    asyncFn,
  } = props;
  const [flag, setFlag] = React.useState(false);
  const deleteExpenses = () => {
    console.log(selected);
    selected.forEach((element) => {
      console.log("element to delete", element);
      changeActiveFood(element)
        .then((res) => {
          console.log(res.data);
          setFlag(true);
          const vec = [...rows.filter((x) => selected.indexOf(x._id) == -1)];
          setRows(vec);
          setNumSelected(0);
          setSelected([]);
          //   asyncFn();
        })
        .catch((err) => console.log(err));
    });
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} נבחרו
        </Typography>
      ) : flag ? (
        <Typography sx={{ flex: "1 1 100%" }} variant="h8" component="div">
          <AlertMessage
            variant={"success"}
            setFlag={setFlag}
            children={<Alerts message={"נמחק בהצלחה!"} />}
          />
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h3 className="">רשימת מאכלים</h3>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteExpenses}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AllFoods() {
  const [foodType, setFoodType] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [foodTypeArr, setFoodTypeArr] = useState([]);
  const [foods, setFoods] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [numSelected, setNumSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getAllFoodType()
      .then((res) => {
        setFoodTypeArr(res.data);
        setFoodType(res.data[0].Id);
      })
      .catch((err) => console.log(err));
    // קבלת כל המאכלים
    getAllFood()
      .then((res) => {
        setFoods(res.data);
        const firstItem = res.data[0];
        const arr = res.data.filter((x) => x.FoodTypeId == firstItem.Id);
        doArr(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const arr = foods.filter((x) => x.FoodTypeId == foodType && x.Name.includes(searchValue));
    doArr(arr);
  }, [foodType, searchValue]);

  const doArr = (data) => {
    let ar = [];
    data.forEach((element) => {
      const item = createData(
        element.Id,
        element.Name,
        element.FoodTypeId,
        element.Price,
        element.Image,
        element.Active
      );
      ar.push(item);
    });
    setRows([...ar]);
  };

  const onSubmit = (object) => {
    handleClose();
    delete object.Food;
    object.FoodTypeId = foodType;
    console.log(object,"oooo")
    addFood(object)
    .then(res => {
        console.log(res);
        const arr = [...foods, res.data];
        doArr(arr);
    })
    .catch(err => console.log(err))
    // try {
    //   console.log(object.date_created);
    //   const url = API_URL + "/expenses/" + building._id;
    //   const { data } = await doApiMethodToken(url, "POST", object);
    //   console.log(expenses);
    //   const arr = [...expenses, data];
    //   dispatch(saveExpenses({ arr: arr }));
    //   if (object.isPay) {
    //     dispatch(updateBalance({ balance: object.price * -1 }));
    //   }
    //   asyncFn();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className="">
      <div className="row gx-0 justify-content-center">
        {foodTypeArr.length > 0 && (
          <SelectInput
            arr={foodTypeArr}
            name={"סוג מאכל"}
            value={foodType}
            setValue={setFoodType}
          />
        )}
        <div className="mt-4 col-2">
          <SearchButton search={({ target }) => setSearchValue(target.value)} />
        </div>
        <div className="mt-4 col-2">
          <Model
            open={open}
            onSubmit={onSubmit}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </div>
      </div>
      <Box sx={{ width: "70%", padding: "32px", margin: "auto" }}>
        <Paper sx={{ width: "100%", mb: 2, padding: "24px" }}>
          <EnhancedTableToolbar
            setSelected={setSelected}
            setNumSelected={setNumSelected}
            numSelected={selected.length}
            selected={selected}
            rows={rows}
            setRows={setRows}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />

              {rows.length > 0 ? (
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <FoodSingle
                          handleClick={handleClick}
                          key={row.Id}
                          isItemSelected={isItemSelected}
                          labelId={labelId}
                          row={row}
                        />
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <p style={{ width: "10vw", padding: "24px" }}> אין מאכלים. </p>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}

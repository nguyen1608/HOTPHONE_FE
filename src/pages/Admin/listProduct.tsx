import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { CssBaseline, GlobalStyles } from '@mui/material';
import Loading from "src/components/loading";
import TablePagination from '@mui/material/TablePagination';
import api from 'src/api/ClientApi';
import { Product } from 'src/types/Products';

export default function CustomizedTables() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: theme.palette.common.white,
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllProduct();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      const confirmed = window.confirm('Bạn có chắc là muốn xóa?');
      if (confirmed) {
        const response = await api.delete(`/products/${id}`);
        if (response) {
          toast.success('Xóa thành công !!!');
          getAllProduct();
        } else {
          toast.error('Failed to delete product');
        }
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProducts = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Loading isShow={loading} />
      <TableContainer sx={{ width: '1200px', ml: '290px' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography sx={{ my: '15px', ml: '5px' }} variant='h4' fontWeight={'bold'}>
            Danh Sách Sản Phẩm
          </Typography>
          <Stack sx={{ flexDirection: 'column', justifyContent: 'center', mr: '20px' }}>
            <Link to={'add'}>
              <Button variant="contained" sx={{ height: '30px', textTransform: 'none', backgroundColor: 'white', color: '#2271b1', ":hover": { backgroundColor: "white" }, border: '1px solid #2271b1' }} startIcon={<AddIcon style={{ fill: '#2271b1' }} />}>
                Thêm sản phẩm mới
              </Button>
            </Link>
          </Stack>
        </Box>
        <Table sx={{ border: '1px solid #dcdcdc' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>STT</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>Image</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>Name</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>Price</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>Category</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell style={{ textAlign: 'center' }}>{page * rowsPerPage + index + 1}</StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}><img src={product?.image} alt="" width={'65px'} /></StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}>{product?.title}</StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}>
                  <Box display="flex" textAlign="center" justifyContent="center" gap={2}>
                    <Typography>{product?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Typography>
                    <Typography sx={{ textDecoration: 'line-through' }} fontStyle={'italic'}>{product?.discount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}>{product?.category.name}</StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}>
                  <DeleteIcon style={{ fill: 'red' }} onClick={() => handleDeleteProduct(product._id)} />
                  <Link to={`/admin/edit/${product._id}`}>
                    <EditNoteSharpIcon style={{ fill: 'Navy' }} sx={{ mx: '5px' }} />
                  </Link>
                  <Link to={`/detail/${product._id}`}>
                    <RemoveRedEyeIcon style={{ fill: 'gold' }} />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

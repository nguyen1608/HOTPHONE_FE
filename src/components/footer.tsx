
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
            THÔNG TIN VÀ CHÍNH SÁCH
            </Typography>
            <Typography variant="body2" width={'230px'} color="text.secondary">Mua hàng và thanh toán Online</Typography>
            <Typography variant="body2" width={'230px'} color="text.secondary">Mua hàng trả góp Online</Typography>
            <Typography variant="body2" width={'230px'} color="text.secondary">Mua hàng trả góp bằng thẻ tín dụng</Typography>
            <Typography variant="body2" width={'230px'} color="text.secondary">Chính sách giao hàng</Typography>
            <Typography variant="body2" width={'230px'} color="text.secondary">Xem ưu đãi Smember</Typography>
            <Typography variant="body2" width={'230px'} color="text.secondary">Tra thông tin bảo hành</Typography>
            <Typography variant="body2" width={'230px'} color="text.secondary">Quy định về việc sao lưu dữ liệu</Typography>
            <Typography variant="body2" width={'240px'} color="text.secondary">Chính sách khui hộp sản phẩm Apple</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
            TỔNG ĐÀI MIỄN PHÍ
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Tư vấn mua hàng (Miễn phí)
            1800.6601 (Nhánh 1)
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Hỗ trợ kỹ thuật
            1800.6601 (Nhánh 2)
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Góp ý, khiếu nại
            1800.6616 (8h00 - 22h00)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
            KẾT NỐI VỚI CHÚNG TÔI
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
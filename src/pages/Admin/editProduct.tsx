import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import { Product } from 'src/types/Products';
import api from 'src/api/ClientApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UploadImage from 'src/components/uploadFile';

const EditProductForm = () => {
    const { handleSubmit, control, formState: { errors }, setValue, getValues, reset } = useForm<Product>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [cates, setCate] = useState<Category[]>([]);
    const [initialImage, setInitialImage] = useState<string>('');
    const [initialImage2, setInitialImage2] = useState<string>('');

    type Category = {
        _id: string;
        name: string;
        description: string;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                const productData = response.data;
                setInitialImage(productData.image);
                setInitialImage2(productData.image2);
                reset({
                    ...productData,
                    price: productData.price.toString(),
                    discount: productData.discount.toString(),
                    total: productData.total.toString()
                });
            } catch (error) {
                toast.error('Error API !!!');
            }
        };

        fetchProduct();
    }, [id, reset]);

    const onSubmit = async (data: Product) => {
        try {
            const transformedData: Product = {
                ...data,
                price: parseFloat(data.price as unknown as string),
                discount: parseFloat(data.discount as unknown as string),
                total: parseInt(data.total as unknown as string, 10),
                image: getValues('image'), // Lấy giá trị ảnh từ form
                image2: getValues('image2')
            };

            const res = await api.put(`/products/${id}`, transformedData);
            if (res.status === 200) {
                navigate('/admin');
                window.location.reload();
            }
        } catch (error) {
            toast.error('Error API !!!');
        }
    };

    const getCate = async () => {
        try {
            const { data } = await api.get("/categories");
            setCate(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCate();
    }, []);

    return (
        <Container sx={{ width: "900px", ml: "440px", mb: "100px" }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 4 }}
            >
                <Typography mt={3} variant="h4" fontWeight={'bold'} component="h1" gutterBottom>
                    Edit Sản Phẩm
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Tên sản phẩm là bắt buộc' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Tên Sản Phẩm"
                                variant="outlined"
                                fullWidth
                                type='text'
                                margin="normal"
                                error={!!errors.title}
                                helperText={errors.title ? errors.title.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: 'Giá sản phẩm là bắt buộc',
                            validate: value => value >= 0 || 'Giá sản phẩm không được là số âm',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Giá Sản Phẩm"
                                variant="outlined"
                                fullWidth
                                type='number'
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.price}
                                helperText={errors.price ? errors.price.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="discount"
                        control={control}
                        rules={{
                            required: 'Giá gốc là bắt buộc',
                            validate: value => value >= 0 || 'Giá gốc sản phẩm không được là số âm',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Giá Gốc Sản Phẩm"
                                variant="outlined"
                                fullWidth
                                type='number'
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.discount}
                                helperText={errors.discount ? errors.discount.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="total"
                        control={control}
                        rules={{ required: 'Số lượng là bắt buộc' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Số Lượng Sản Phẩm"
                                variant="outlined"
                                type='number'
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.total}
                                helperText={errors.total ? errors.total.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Mô tả sản phẩm là bắt buộc' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Mô Tả Sản Phẩm"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ''}
                                multiline
                                rows={4}
                            />
                        )}
                    />
                    <UploadImage
                        name="image"
                        setValue={(name, value) => setValue(name as keyof Product, value)}
                        defaultValue={initialImage}
                    />
                    <UploadImage
                        name="image2"
                        setValue={(name, value) => setValue(name as keyof Product, value)}
                        defaultValue={initialImage2}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.category}>
                        <InputLabel>Danh Mục Sản Phẩm</InputLabel>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: "Loại sản phẩm là bắt buộc" }}
                            render={({ field }) => (
                                <Select {...field} label="Danh Mục Sản Phẩm" variant="outlined" value={field.value || ''}>
                                    {cates.map((cate) => (
                                        <MenuItem key={cate._id} value={cate._id}>
                                            {cate.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.category && (
                            <Typography color="error">{errors.category.message}</Typography>
                        )}
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Update
                    </Button>
                </form>
                <ToastContainer />
            </Box>
        </Container>
    );
};

export default EditProductForm;

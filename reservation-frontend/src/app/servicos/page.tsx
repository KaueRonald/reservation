'use client';
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import styles from "./index.module.scss";
import { NavBar } from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { api } from "@/services/axiosClient";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface Service {
    id: string;
    name: string;
    type: string;
    description: string;
    price: number;
}

export default function Servicos() {
    const [services, setServices] = useState<Service[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get<Service[]>('/getallservices');
                setServices(response.data);
            } catch (error) {
                setError('Failed to fetch services');
                console.error(error);
            }
        };

        fetchServices();
    }, []);

    return (
        <Box className={styles.container}>
            <NavBar />
            {error && <Typography color="error">{error}</Typography>}
            <Box className={styles.services}>
                {services.map((service) => (
                    <Card variant="outlined" key={service.id} className={styles.card}>
                        <CardContent>
                            <Typography className={styles.type}>
                                <ArrowRightIcon sx={{ color: '#E44141' }} /> {service.type}
                            </Typography>
                            <Typography className={styles.name} variant="h5" component="div">
                                {service.name}
                            </Typography>
                            {/* <Typography className={styles.description} color="text.secondary">
                                {service.description}
                            </Typography> */}
                            <Typography className={styles.price}>
                                Á partir de R$ {service.price},00 Reais
                                <br />
                            </Typography>
                            <Button className={styles.btnDetail} variant="outlined" size="small">Detalhes</Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
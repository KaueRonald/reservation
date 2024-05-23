'use client';
import { Box, Button, Card, CardActions, CardContent, Drawer, Modal, Typography } from "@mui/material";
import styles from "./index.module.scss";
import { NavBar } from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { api } from "@/services/axiosClient";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

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
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = async (serviceId: string) => {
        try {
            const response = await api.get<Service>(`/getservice/${serviceId}`);
            setSelectedService(response.data);
            setOpen(true);
        } catch (error) {
            setError('Failed to fetch service details');
            console.error(error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    }

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
                            <Button className={styles.btnDetail} onClick={() => handleOpen(service.id)} variant="outlined" size="small">Detalhes</Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                className={styles.modal}
            >
                {selectedService ? (
                    <Box className={styles.containermodal}>
                        <Box className={styles.BoxNav}>
                            <Typography id="child-modal-description" className={styles.boxType}>
                                <ArrowRightIcon sx={{ color: '#E44141' }} />  {selectedService.type}
                            </Typography>
                            <Typography onClick={handleClose} className={styles.btnx}>
                                <CloseIcon fontSize="large" sx={{ color: '#000000' }} />
                            </Typography>
                        </Box>
                        <Typography id="child-modal-title" variant="h6" component="h2" className={styles.boxName}>
                            {selectedService.name}
                        </Typography>
                        <Typography className={styles.boxDesc}>
                            {selectedService.description}
                        </Typography>
                        <Typography className={styles.boxPrice}>
                            <ArrowRightIcon sx={{ color: '#E44141' }} /> Preço á partir de R$ {selectedService.price},00
                        </Typography>
                        <Button variant="outlined" className={styles.btnagendar}>Agendar</Button>
                    </Box>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Modal>
        </Box>
    );
}
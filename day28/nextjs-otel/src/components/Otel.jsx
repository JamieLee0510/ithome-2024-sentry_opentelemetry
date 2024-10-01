'use client';
import React, { useEffect } from 'react';
import { initBrowserOtel } from '../lib/otel/instrument.browser';

export default function Otel() {
    useEffect(() => {
        initBrowserOtel();
    }, []);

    return null;
}

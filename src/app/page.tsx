'use client';

import { SantaWishForm } from '@/components/SantaWishForm/SantaWishForm';

const send = (data: any) => {
	console.log(data);
};

export default function Home() {
	return <SantaWishForm send={send} />;
}

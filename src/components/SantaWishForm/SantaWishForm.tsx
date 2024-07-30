'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

const priorityOptions = ['1', '2', '3', '4', '5'] as const;

const WishSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	wish: z.string().min(1, 'Wish is required'),
	priority: z.enum(priorityOptions)
});

type WishSchemaType = z.infer<typeof WishSchema>;

interface SantaWishFormProps {
	send: (data: WishSchemaType) => void;
}

export const SantaWishForm: React.FC<SantaWishFormProps> = ({ send }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset
	} = useForm<WishSchemaType>({
		resolver: zodResolver(WishSchema),
		defaultValues: {
			priority: '1'
		}
	});

	const onSubmit: SubmitHandler<WishSchemaType> = (data) => {
		send(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4 m-4'>
			<div>
				<label
					htmlFor='name'
					className='block font-medium dark:bg-slate-50'
				>
					Name
				</label>
				<Input
					id='name'
					{...register('name')}
					className='mt-1 block w-full'
				/>
				{errors.name && (
					<p className='mt-2 text-red-600'>{errors.name.message}</p>
				)}
			</div>

			<div>
				<label
					htmlFor='wish'
					className='block font-medium dark:bg-slate-50'
				>
					Wish
				</label>
				<Textarea
					id='wish'
					{...register('wish')}
					className='mt-1 block w-full'
				/>
				{errors.wish && (
					<p className='mt-2 text-red-600'>{errors.wish.message}</p>
				)}
			</div>

			<div>
				<label
					htmlFor='priority'
					className='block font-medium dark:bg-slate-50'
				>
					Priority
				</label>
				<Controller
					name='priority'
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select value={value} onValueChange={onChange}>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='value' />
							</SelectTrigger>
							<SelectContent>
								{priorityOptions.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				{errors.priority && (
					<p className='mt-2 text-red-600'>{errors.priority.message}</p>
				)}
			</div>

			<div>
				<Button type='submit' className='mt-4'>
					Send
				</Button>
			</div>
		</form>
	);
};

import React, { useContext, useEffect, useState } from 'react';
import TeacherContext from '../context/teacher/teacherContext';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import {
	Avatar,
	Paper,
	makeStyles,
	Typography,
	Slider,
	Button,
	TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '60%',
		display: 'flex',
		justifyContent: 'space-between',
		margin: '50px auto',
		padding: theme.spacing(2),
	},
	avatar: {
		alignSelf: 'center',
		'& > *': {
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

function TeacherProfile() {
	const teacherContext = useContext(TeacherContext);
	const {
		teacher,
		getTeacherByName,
		loading,
		addRating,
		addComment,
	} = teacherContext;

	const { tName } = useParams();

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	useEffect(() => {
		getTeacherByName(tName);
		console.log(tName);
		console.log(loading);
		console.log(teacher);
		// eslint-disable-next-line
	}, [loading]);

	const handleRating = (e, newValue) => {
		setRating(newValue);
		console.log(rating);
	};
	const handleComment = (e) => {
		setComment(e.target.value);
		console.log(comment);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('Saved');
		addRating(tName, {
			rating,
		});
		addComment(tName, {
			comment,
		});
	};

	const classes = useStyles();
	return (
		<div>
			{!loading && teacher != null ? (
				<Paper elevation={2} className={classes.root}>
					<div className={classes.avatar}>
						<Avatar
							alt='Remy Sharp'
							src='/static/images/avatar/1.jpg'
						/>
					</div>
					<div>
						<Typography variant='h5'>
							Full Name: {teacher.fullName}
						</Typography>
						<br />
						<Typography variant='h6'>
							Teacher Name: {teacher.teacherName}
						</Typography>{' '}
						<br />
						<Typography variant='h6'>
							Rating: {teacher.rating}
						</Typography>{' '}
						<br />
						<Typography variant='h6'>
							Total Ratings: {teacher.totalRatings}
						</Typography>{' '}
						<br />
						<form
							className={classes.formControl}
							onSubmit={onSubmit}>
							<Slider
								value={rating}
								onChange={handleRating}
								aria-labelledby='discrete-slider-small-steps'
								step={1}
								min={0}
								max={10}
								valueLabelDisplay='on'
							/>
							<TextField
								id='filled-multiline-flexible'
								label='Comment'
								rowsMax={5}
								value={comment}
								onChange={handleComment}
								variant='filled'
								fullWidth
							/>
							<Button
								type='submit'
								color='primary'
								variant='contained'>
								Save
							</Button>
						</form>
					</div>
				</Paper>
			) : (
				<Skeleton variant='rect' height={200} />
			)}
		</div>
	);
}

export default TeacherProfile;

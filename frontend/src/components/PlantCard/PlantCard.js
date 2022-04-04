import './PlantCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const careLevelIcon = <FontAwesomeIcon icon={faLeaf} />;
const locationInteriorIcon = <FontAwesomeIcon icon={faHouse} />;
const locationExteriorIcon = <FontAwesomeIcon icon={faSun} />;
const irrigationIcon = <FontAwesomeIcon icon={faDroplet} />;
const soilIcon = <FontAwesomeIcon icon={faSeedling} />;
const petFriendlyIcon = <FontAwesomeIcon icon={faPaw} />;

export default function PlantCard({
	id,
	imageUrl,
	commonName,
	interiorExterior,
	careLevel,
	petFriendly,
	addToMyPlants,
	deleteFromMyPlants,
	// only needed for Collection
	scientificName,
	location,
	irrigation,
	irrigationSummer,
	irrigationWinter,
	soil,
	//only needed for myPlants
	nickname,
}) {
	const careLevelIcons = [];
	for (let i = 0; i < careLevel; i++) {
		careLevelIcons.push(<i class='fa-solid fa-leaf'></i>);
	}

	let careLevelInfo = [];
	for (var i = 0; i < careLevel; i++) {
		careLevelInfo.push(careLevelIcon);
	}

	// Hooks
	const weblocation = useLocation();

	return (
		<>
			<div class='card__image'>
				<img src={`/images/${imageUrl}.jpg`} alt={commonName} />
			</div>
			<div class='card__info'>
				{weblocation.pathname !== '/myplants' && <h2>{scientificName}</h2>}
				<h3>{commonName}</h3>
				<h3>{nickname}</h3>
				{weblocation.pathname === '/myplants' && (
					<>
						<ul>
							<li class='card__carelevel'>
								<span>{careLevelInfo} </span>
							</li>
							<li class='plantLocation'>
								<p>
									{interiorExterior !== 1 ? (
										interiorExterior === 2 ? (
											<span className='altIcons' title='Exterior'>
												{locationExteriorIcon} {location}
											</span>
										) : (
											<span
												className='altIcons'
												title='Interior &amp; Exterior'>
												{locationInteriorIcon}
												{locationExteriorIcon}
											</span>
										)
									) : (
										<>
											<span className='altIcons' title='Interior'>
												{locationInteriorIcon}
												{''}
											</span>
											<span> {location}</span>
										</>
									)}
								</p>
							</li>
							<li class='plantIrrigation'>
								<span className='altIcons' title='Irrigation'></span>
								<span>
									{irrigationIcon}
									{''}
									{
										{
											1: 'Una vez al mes ',
											2: 'Una vez a la semana ',
											3: '2/3 veces por semana ',
											4: 'Cada día ',
										}[irrigationSummer]
									}
									en verano,
								</span>
								<span>
									{
										{
											1: 'Una vez al mes ',
											2: 'Una vez a la semana ',
											3: '2/3 veces por semana ',
											4: 'Cada día ',
										}[irrigationWinter]
									}
									en invierno.
								</span>
								<p>{irrigation}</p>
							</li>
							{soil !== '' && (
								<li>
									<span title='Soil'>
										{soilIcon}
										{''} {soil}
									</span>
								</li>
							)}
							<div class='card__petfriendly'>
								{petFriendly && (
									<>
										<i class='fa-solid fa-paw'> {petFriendlyIcon}</i>
										<span>Apto para mascotas</span>
									</>
								)}
							</div>
						</ul>
					</>
				)}
			</div>
		</>
	);
}

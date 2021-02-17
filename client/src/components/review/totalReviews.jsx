import React, {useEffect, useState} from "react";
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function TotalReviews() {

  const[average, setAverage] = useState(0);
  const { id } = useParams();

  const getItemAverage = () => {
    axios.get(`/reviews/${id}/avg`).then((res) => setAverage(res.data));
  }
  useEffect(getItemAverage, [])
  
    return (
      <div style={{marginBottom:"15px", marginTop: "15px"}}>
          <Rating
            name="half-rating-read"
            value={average}
            precision={0.25}
            readOnly
          />
      </div>
    );
 

  
}


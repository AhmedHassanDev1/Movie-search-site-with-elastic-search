from typing import Annotated
from elasticsearch import Elasticsearch
from fastapi import FastAPI, Query, Path
import datetime
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MPNet-base-v2')


date = datetime.datetime.now()
current_year = int(date.strftime('%Y'))

client = Elasticsearch('http://localhost:9200')

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get('/search/fulltext')
def TextSearchAPI(
    text: str | None = None,
    min_rate: Annotated[int | None, Query(ge=0, lt=10)] = 0,
    max_rate: Annotated[int | None, Query(gt=0, le=10,)] = 10,
    type: str | None = None,
    limit: int | None = None,
    offset: int | None = None,
    genres: Annotated[list[str] | None, Query()] = None
):

    must = [
        {
            "multi_match": {
                "query": text,
                "fields": ['title'],
                "fuzziness": "AUTO"
            },
        },
        {
            "terms": {
                "type": [type] if type is not None else ['movie', 'tv']
            }
        },
        {
            "range": {
                "rate": {
                    "gte": min_rate,
                    "lte": max_rate
                }
            }
        },
    ]
    if genres is not None:
        must.append({
            "terms": {
                "genres.keyword": genres,
            }
        })
    results = client.search(
        index='movies',
        query={
            "bool": {
                "must": must
            }
        },
       
        size=limit,
        from_=offset,
        source={
            "excludes": ["embedding_vector"],

        }
    )
    return results.get('hits', {}).get('hits', [])


@app.get('/search/similar')
def SimilarSearch(
    text: Annotated[str | None, Query(...)] = None,
):
    embedding = model.encode(text).tolist()

    NearestNeighbors = client.search(
        index='movies',
        knn={
            "field": "embedding_vector",
            "k": 5,
            "query_vector": embedding,
            "num_candidates": 20
        },
        source={
            "excludes": ["embedding_vector"],

        }

    )

    return NearestNeighbors.get('hits', {}).get('hits', [])

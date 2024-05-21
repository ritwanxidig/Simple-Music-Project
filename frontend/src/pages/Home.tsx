import { fetchStatsRequest } from "@/app/slices/statsSlice";
import { RootState } from "@/app/store"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const { loading, error, data } = useSelector((state: RootState) => state.stats);
  const dispatch = useDispatch();
  const StatCard = ({ title, data }: { title: string, data: number }) => {
    return (
      <div className="flex flex-col bg-blue-100 p-4 rounded-md w-full">
        <h2 className="text-6xl font-bold">{data}</h2>
        <h1 className="font-medium">{title}</h1>
      </div>
    )
  }

  const ArtistStatCard = ({ artist, songs, albums }: { artist: string, songs: number, albums: number }) => {
    return (
      <div className="flex flex-col bg-blue-100 p-4 rounded-md w-full">
        <h2 className="text-xl font-bold capitalize ">{artist}</h2>
        <div className="flex justify-between items-center">
          <h1>
            <strong>Albums</strong>: {albums}
          </h1>
          <h1>
            <strong>Songs</strong>: {songs}
          </h1>
        </div>
      </div>
    )
  }


  useEffect(() => {
    dispatch(fetchStatsRequest());
  }, [])
  if (loading) return <div>Loading ...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1>Overview</h1>
        <div className="flex items-center gap-4 w-full">
          <StatCard title="All Songs" data={data?.totalSongs || 0} />
          <StatCard title="Albums" data={data?.totalAlbums || 0} />
          <StatCard title="Genres" data={data?.totalGenres || 0} />
        </div>
      </div>
      <div>
        <h1>Genre Stats</h1>
        <div className="grid grid-cols-5 items-center gap-4 w-full">
          {data?.songsByGenre?.map((s, i) => (
            <StatCard key={i} title={s._id} data={s.count} />
          ))}
        </div>
      </div>
      <div>
        <h1>Albums Stats</h1>
        <div className="grid grid-cols-5 items-center gap-4 w-full">
          {data?.songsByAlbum?.map((s, i) => (
            <StatCard key={i} title={s._id} data={s.count} />
          ))}
        </div>
      </div>
      <div>
        <h1>Artist Statistics</h1>
        <div className="grid grid-cols-5 items-center gap-4 w-full">
          {data?.artistStats?.map((s, i) => (
            <ArtistStatCard key={i} artist={s.artist} songs={s.songs} albums={s.albums} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
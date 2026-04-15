import { Star, StarHalf } from "lucide-react"

const RatingStar = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {
        Array.from({ length: 5 }, (_, i) => {
          //[0, 1, 2, 3, 4]
          const starValue = i + 0.5;
          return (
            <span key={i}>
              {rating >= i + 1 ? ( //4.5 >= 0 + 1
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ) : rating >= starValue ? (
                <StarHalf className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ) : (
                <Star className="w-3.5 h-3.5 fill-muted text-muted" />
              )}
            </span>
          )
        })
      }
    </div>
  )
}

export default RatingStar
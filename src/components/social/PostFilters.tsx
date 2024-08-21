import Button from 'components/Button'
import React from 'react'

const PostFilters = () => {
  return (
    <div className="flex space-x-3">
      <Button variant="primary" text="Following" size="sm" />
      <Button variant="outline" text="Everyone" size="sm" />
      <Button variant="outline" text="For You" size="sm" />
    </div>
  )
}

export default PostFilters

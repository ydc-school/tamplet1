import React from 'react'

export default async function page({ params }) {
    const { categorySlug } = await params;
    return (
        <div>page Category{categorySlug}</div>
    )
}

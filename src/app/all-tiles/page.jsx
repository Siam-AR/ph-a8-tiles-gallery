"use client";

import { useState, useMemo } from "react";
import TilesCard from "@/components/TilesCard";
import { Input, Button } from "@heroui/react";
import { FaSearch } from "react-icons/fa";
import tiles from "../../../public/data.json";
import categories from "../../../public/category.json";

const AllTilesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const tileItems = tiles;

  const filteredTiles = useMemo(() => {
    let filtered = tileItems;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (tile) =>
          tile.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((tile) =>
        tile.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, tileItems]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="space-y-6">
      {/* Hero Search Section */}
      <div className="py-8 px-4 md:py-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">All Tiles</h1>

          <p className="text-gray-600 dark:text-gray-400">
            Search through our collection of premium tiles
          </p>

          <Input
            isClearable
            type="text"
            placeholder="Search tiles by title..."
            startContent={<FaSearch className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // Clear category filter when clicking input
            onFocus={() => setSelectedCategory("")}
            className="mt-4 w-full"
            size="lg"
            radius="md"
            onClear={() => setSearchQuery("")}
            classNames={{
              input: "text-base",
              inputWrapper:
                "h-14 border-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900",
            }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Clear Button */}
          <div className="flex justify-end">
            {(selectedCategory || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.name ? "" : category.name,
                  )
                }
                variant={
                  selectedCategory === category.name ? "solid" : "bordered"
                }
                size="sm"
                className={
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : ""
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Counter */}
      {(searchQuery || selectedCategory) && (
        <div className="px-4">
          <div className="max-w-4xl mx-auto text-sm text-gray-600 dark:text-gray-400">
            Found{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredTiles.length}
            </span>{" "}
            {selectedCategory ? (
              <>
                {selectedCategory} tile
                {filteredTiles.length !== 1 ? "s" : ""}
              </>
            ) : (
              <>tile{filteredTiles.length !== 1 ? "s" : ""}</>
            )}
            {searchQuery && <> matching {searchQuery}</>}
          </div>
        </div>
      )}

      {/* Tiles Grid */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          {filteredTiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredTiles.map((tile) => (
                <TilesCard key={tile.id} tile={tile} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {searchQuery || selectedCategory
                  ? `No tiles found${searchQuery ? ` matching "${searchQuery}"` : ""}${selectedCategory ? ` in ${selectedCategory}` : ""}`
                  : "No tiles available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTilesPage;
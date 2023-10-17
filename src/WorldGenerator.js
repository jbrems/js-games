export default class WorldGenerator {
  static tiles = [[]];

  static rules = {
    grassLightToSandTopLeft: {
      north: ['grassLightCenter', 'grassLightToSandTop', 'grassLightToSandTopRight'],
      east: ['sand1'],
      south: ['grassLighCenter', 'grassLightToSandLeft', 'grassLightToSandBottomLeft'],
      west: ['sand1'],
    },
    grassLightToSandTop: {
      north: ['sand1'],
      east: ['grassLightCenter', 'grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightToSandRight', 'grassLightToSandBottomRight', 'grassLightToSandBottom'],
      south: ['grassLightCenter', 'grassLightToSandLeft', 'grassLightToSandRight', 'grassLightToSandBottomLeft', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      west: ['grassLightCenter', 'grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandLeft', 'grassLightToSandBottomLeft', 'grassLightToSandBottom'],
    },
    grassLigthToSandTopRight: {
      north: ['sand1'],
      east: ['sand1'],
      south: ['grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottomLeft', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      west: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandBottomLeft', 'grassLightToSandBottom'],
    },
    grassLightToSandLeft: {
      north: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight'],
      east: ['grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      south: ['grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottomLeft', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      west: ['sand1'],
    },
    grassLightCenter: {
      north: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight'],
      east: ['grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      south: ['grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottomLeft', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      west: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandBottomLeft', 'grassLightToSandBottom'],
    },
    grassLightToSandRight: {
      north: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight'],
      east: ['sand1'],
      south: ['grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottomLeft', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      west: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandBottomLeft', 'grassLightToSandBottom'],
    },
    grassLightToSandBottomLeft: {
      north: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight'],
      east: ['grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      south: ['sand1'],
      west: ['sand1'],
    },
    grassLightToSandBottom: {
      north: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight'],
      east: ['grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightCenter', 'grassLightToSandRight', 'grassLightToSandBottom', 'grassLightToSandBottomRight'],
      south: ['sand1'],
      west: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandBottomLeft', 'grassLightToSandBottom'],
    },
    grassLightToSandBottomRight: {
      north: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandTopRight', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandRight'],
      east: ['sand1'],
      south: ['sand1'],
      west: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandLeft', 'grassLightCenter', 'grassLightToSandBottomLeft', 'grassLightToSandBottom'],
    },
    sand1: {
      north: ['grassLightToSandBottomLeft', 'grassLightToSandBottom', 'grassLightToSandBottomRight', 'sand1'],
      east: ['grassLigthToSandTopLeft', 'grassLightToSandLeft', 'grassLightToSandBottomLeft', 'sand1'],
      south: ['grassLightToSandTopLeft', 'grassLightToSandTop', 'grassLightToSandTopRight', 'sand1'],
      west: ['grassLigthToSandTopRight', 'grassLightToSandRight', 'grassLightToSandBottomRight', 'sand1'],
    },
  };

  static get(offsetX, offsetY, columns, rows) {
    // Fill the tiles with all possible options
    this.tiles = new Array(rows).fill(0).map(() => new Array(columns).fill(0).map(() => Object.keys(this.rules)));

    let { row, column, options } = this.getTileWithLeastAmountOfOptions();

    while (row !== undefined && column !== undefined) {
      this.tiles[row][column] = [options[Math.floor(Math.random() * options.length)]];
      if (row-1 >= 0) this.tiles[row-1][column] = this.intersect(this.tiles[row-1][column], this.rules[this.tiles[row][column]].north);
      if (column+1 < columns) this.tiles[row][column+1] = this.intersect(this.tiles[row][column+1], this.rules[this.tiles[row][column]].east);
      if (row+1 < rows) this.tiles[row+1][column] = this.intersect(this.tiles[row+1][column], this.rules[this.tiles[row][column]].south);
      if (column-1 >= 0) this.tiles[row][column-1] = this.intersect(this.tiles[row][column-1], this.rules[this.tiles[row][column]].west);

      ({ row, column, options } = this.getTileWithLeastAmountOfOptions());
      console.log('Found tile with least amount of options', [...this.tiles], row, column, options);
    }

    console.table(this.tiles.map(r => r.map(c => c.join(','))));

    return this.tiles;
  }

  static getTileWithLeastAmountOfOptions() {
    return this.tiles.reduce((tileOfRow, row, rowIndex) => {
      const rowTile = row.reduce((tile, options, columnIndex) => {
        if (options.length > 1 && options.length < tile.options.length) return { column: columnIndex, row: rowIndex, options };
        return tile;
      }, { options: { length: 9999 } });

      if (rowTile.options.length < tileOfRow.options.length) return rowTile;
      return tileOfRow;
    }, { options: { length: 9999 } });
  }

  static intersect(arr1, arr2) {
    const intersection = arr1.filter((option) => arr2.includes(option));
    if (!intersection.length) console.warn('Failed to find intersecting options', arr1, arr2);
    return intersection;
  }


}
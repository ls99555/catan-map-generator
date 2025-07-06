# 5-6 Player Harbor Positions Visual

## Current Harbor Layout

```
                    H1      H2
                     |       |
                     v       v
                [1,-4,3]  [3,-4,1]
                     |       |
            [1,-3,2] [2,-3,1] [3,-3,0]
                     |       |
    H4 -> [-2,-1,3] [-1,-1,2] [0,-1,1] [1,-1,0] [2,-1,-1] [3,-2,-1] <- H3
            |         |       |       |       |       |       |
    [-2,0,2] [-1,0,1] [0,0,0] [1,0,-1] [2,0,-2] [3,0,-3] <- H5
      |       |       |       |       |       |
    [-2,1,1] [-1,1,0] [0,1,-1] [1,1,-2] [2,1,-3]
      |       |       |       |       |
    [-2,2,0] [-1,2,-1] [0,2,-2] [1,2,-3] [2,2,-4]
      |       |       |       |       |
    [-2,3,-1] [-1,3,-2] [0,3,-3] [1,3,-4]
      |       |       |       |
    H9 -> [-3,4,-1] [-1,4,-3] [1,3,-4] <- H11
            |       |       |
          H10 -> [0,4,-4]
```

## Harbor Details

### H1 - Top Left (Generic)
- **Position**: [1,-4,3]
- **Adjacent Land**: [1,-3,2] (First tile in row 0)
- **Icon**: `{ x: 0.3, y: 0.7 }`, rotation: -90°
- **Description**: Directly above first tile in top row

### H2 - Top Right (Generic)
- **Position**: [3,-4,1]
- **Adjacent Land**: [2,-3,1] (Second tile in row 0)
- **Icon**: `{ x: -0.3, y: 0.7 }`, rotation: -90°
- **Description**: Diagonal top-right from second tile

### H3 - Top Right Corner (Specific Harbor)
- **Position**: [4,-3,-1]
- **Adjacent Land**: [3,-2,-1] (Fourth tile in row 1)
- **Icon**: `{ x: -0.4, y: 0.6 }`, rotation: -90°
- **Description**: Top right corner of the board

### H4 - Left Side (Specific Harbor)
- **Position**: [-2,-1,3]
- **Adjacent Land**: [-1,-1,2] (First tile in row 2)
- **Icon**: `{ x: 0.7, y: 0 }`, rotation: -150°
- **Description**: Left side of the board

### H5 - Right Side (Specific Harbor)
- **Position**: [4,0,-4]
- **Adjacent Land**: [3,0,-3] (Sixth tile in row 3)
- **Icon**: `{ x: -0.7, y: 0 }`, rotation: -90°
- **Description**: Right side of the board

### H6 - Bottom Left (Generic)
- **Position**: [-3,1,2]
- **Adjacent Land**: [-2,0,2] (First tile in row 3)
- **Icon**: `{ x: -0.3, y: -0.3 }`, rotation: -150°
- **Description**: Bottom left area

### H7 - Bottom Side (Specific Harbor)
- **Position**: [2,2,-4]
- **Adjacent Land**: [2,1,-3] (Fifth tile in row 4)
- **Icon**: `{ x: 0, y: -0.7 }`, rotation: -90°
- **Description**: Bottom side of the board

### H8 - Left Side Lower (Generic)
- **Position**: [-3,2,1]
- **Adjacent Land**: [-2,2,0] (First tile in row 5)
- **Icon**: `{ x: 0.7, y: 0 }`, rotation: -150°
- **Description**: Left side, lower position

### H9 - Bottom Left Corner (Specific Harbor)
- **Position**: [-3,4,-1]
- **Adjacent Land**: [-2,3,-1] (First tile in row 6)
- **Icon**: `{ x: 0.4, y: -0.7 }`, rotation: -120°
- **Description**: Bottom left corner

### H10 - Bottom Center (Generic)
- **Position**: [-1,4,-3]
- **Adjacent Land**: [-1,3,-2] (Second tile in row 6)
- **Icon**: `{ x: 0, y: -0.7 }`, rotation: -90°
- **Description**: Bottom center

### H11 - Right Side Lower (Specific Harbor)
- **Position**: [1,3,-4]
- **Adjacent Land**: [0,3,-3] (Third tile in row 6)
- **Icon**: `{ x: -0.7, y: 0 }`, rotation: -90°
- **Description**: Right side, lower position

## Harbor Distribution (5-6 Players)
- **Generic (3:1)**: 5 harbors (H1, H2, H6, H8, H10)
- **Brick (2:1)**: 1 harbor
- **Lumber (2:1)**: 1 harbor
- **Wool (2:1)**: 2 harbors
- **Grain (2:1)**: 1 harbor
- **Ore (2:1)**: 1 harbor

**Total: 11 harbors** (matching the BASE_GAME_TILE_COUNTS configuration)

## Visual Reference
- Harbors are positioned around the perimeter of the 5-6 player board
- Each harbor connects to one adjacent land hex
- Icon offsets and rotations ensure proper visual alignment
- The layout follows the official Catan 5-6 player expansion pattern

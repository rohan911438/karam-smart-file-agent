import argparse
from utils.zipper import zip_files, unzip_file

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="All-in-One Smart File Utility Agent")
    parser.add_argument('--task', required=True, choices=['zip', 'unzip'], help='Task to perform')
    parser.add_argument('--files', nargs='+', help='Files or folders to process (for zip)')
    parser.add_argument('--output', help='Output file or folder')
    parser.add_argument('--zipfile', help='ZIP file to extract (for unzip)')
    parser.add_argument('--extract_to', help='Folder to extract to (for unzip)')
    args = parser.parse_args()

    if args.task == 'zip':
        if not args.files or not args.output:
            print('For zip, provide --files and --output')
        else:
            zip_files(args.files, args.output)
            print(f'Created archive: {args.output}')
    elif args.task == 'unzip':
        if not args.zipfile or not args.extract_to:
            print('For unzip, provide --zipfile and --extract_to')
        else:
            unzip_file(args.zipfile, args.extract_to)
            print(f'Extracted {args.zipfile} to {args.extract_to}') 